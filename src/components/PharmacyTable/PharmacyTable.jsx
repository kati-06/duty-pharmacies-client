import {useState, useEffect} from 'react';
import PharmacyCard from '../PharmacyCard/PharmacyCard';
import './PharmacyTable.style.css';
import {fetchPharmacies} from '../../services/api';
import LoadingSpinner from '../LoadingSpinner';
import MapSelectionModal from '../MapSelectionModal/MapSelectionModal';
import {fetchPharmacy} from '../../services/api';

function PharmacyTable({pharmacies, setPharmacies}) {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState('');
  const [pharmacyData, setPharmacyData] = useState({});

  // IGNORE IT FOR NOW
  //useEffect(() => {
  //  const fetchData = async () => {
  //    try {
  //      const response = await fetchPharmacies({
  //        city: 'ankara',
  //        county: '',
  //      });
  //      setPharmacies(response);
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  };

  //  fetchData();
  //}, [setPharmacies]);

  //if (!pharmacies) return <LoadingSpinner />;

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    if (pharmacyData.data) {
      if (isMobile) {
        setShowModal(true);
      } else {
        const pharmacy = pharmacyData.data;
        let url = '';

        if (pharmacyData.isFound) {
          const {location} = pharmacy.geometry;
          url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}&query_place_id=${pharmacy.place_id}`;
        } else {
          url = `https://www.google.com/maps/search/?api=1&query=${pharmacy.latitude},${pharmacy.longitude}`;
        }

        // Open Google Maps in a new browser tab on desktop
        window.open(url, '_blank');
      }
    }
  }, [pharmacyData, isMobile]);

  const handleClickShowOnMap = async (pharmacyId) => {
    const {data} = await fetchPharmacy(pharmacyId.toString());

    setPharmacyData(data);
  };

  const handleSelectMap = (type = 'google') => {
    let uri = '';

    if (type === 'google') {
      if (pharmacyData.isFound) {
        //const encodedAddress = encodeURI(pharmacyData.data.formatted_address);
        const encodedQuery = encodeURIComponent(
          pharmacyData.data.name + ' ' + pharmacyData.data.formatted_address
        );
        uri = `comgooglemaps://?q=${encodedQuery}`;
      } else {
        uri = `comgooglemaps://?q=${pharmacyData.data.lat},${pharmacyData.data.lng}`;
      }
    } else if (type === 'apple') {
      if (pharmacyData.isFound) {
        const {lat, lng} = pharmacyData.data.geometry.location;
        //const encodedAddress = encodeURI(pharmacyData.data.formatted_address);
        const encodedName = encodeURI(pharmacyData.data.name);

        uri = `maps://maps.apple.com/?daddr=${lat},${lng}&dname=${encodedName}`;
      } else {
        uri = `maps://maps.apple.com/?q=${pharmacyData.data.latitude},${pharmacyData.data.longitude}`;
      }
      //} else if (type === 'yandex') {
    }

    window.location.href = uri;
  };

  if (pharmacies.length === 0)
    return (
      <div className="ms-2 p-2 space-y-5">
        <h1 className="mb-3 font-semibold">
          Eczaneleri listelemek için il seçiniz.
        </h1>
        <p>
          <strong>Türkiye genelinde 7/24</strong> nöbetçi eczanelerin telefonuna
          ve adresine kolayca ulaşabilirsiniz.
        </p>
        <p>
          <strong>Telefon numaralarına</strong> tıklayarak eczaneleri
          arayabilirsiniz.
        </p>
        <p>
          <strong>Haritada göster </strong> tıklayarak ve apple haritaları
          kullanabilirsiniz.
        </p>
      </div>
    );

  return (
    <div className="pharmacy-table  border p-5">
      {showModal && (
        // Black Overlay
        <div className="bg-black bg-opacity-75 w-screen h-screen fixed top-0 left-0"></div>
      )}
      {showModal && (
        <MapSelectionModal
          handleSelectMap={handleSelectMap}
          setShowModal={setShowModal}
        />
      )}
      {pharmacies?.map((pharmacy) => (
        <PharmacyCard
          key={pharmacy._id}
          pharmacyName={pharmacy.pharmacyName}
          city={pharmacy.city}
          county={pharmacy.county}
          address={pharmacy.address}
          phone1={pharmacy.phone}
          pharmacyId={pharmacy._id}
          distance={pharmacy.distance}
          setShowModal={setShowModal}
          handleClickShowOnMap={handleClickShowOnMap}
        />
      ))}
      <div>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4034067416053884"
          crossOrigin="anonymous"
        ></script>
      </div>
    </div>
  );
}

export default PharmacyTable;
