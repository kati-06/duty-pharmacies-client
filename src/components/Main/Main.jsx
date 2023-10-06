import React, {useEffect, useState} from 'react';
import PharmacyTable from '../PharmacyTable/PharmacyTable';
import data from '../../data/data.json';
import {fetchPharmacies} from '../../services/api';
import './Main.style.css';
import PharmacyForm from '../PharmacyForm/PharmacyForm';
import {useNavigate, useParams} from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

function Main() {
  const navigate = useNavigate();
  const {city: cityParam, county: countyParam} = useParams();
  const [updatedPharmacies, setUpdatedPharmacies] = useState([]);
  const [pharmacies, setPharmacies] = useState(null);
  const [countyOptions, setCountyOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(cityParam || '');
  const [selectedCounty, setSelectedCounty] = useState(countyParam || '');
  const [isFetching, setIsFetching] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('Geolocation not supported');
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setUserLocation({latitude, longitude});
    }

    function error() {
      console.log('Unable to retrieve your location');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);

        const response = await fetchPharmacies({
          city: cityParam,
          county: countyParam,
        });
        setPharmacies(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };

    if (cityParam) {
      setSelectedCity(cityParam);
      setSelectedCounty(countyParam);
      const counties = data.find((d) => d.citySlug === cityParam).counties;
      setCountyOptions(
        counties.map((county) => {
          return {
            value: county.countySlug,
            label: county.countyName,
          };
        })
      );
      fetchData();
    }
  }, [cityParam, countyParam]);

  useEffect(() => {
    if (pharmacies && userLocation) {
      const pharmaciesWithDistance = pharmacies
        .map((pharmacy) => {
          const distance = getDistanceFromLatLonInKm(
            userLocation.latitude,
            userLocation.longitude,
            pharmacy.latitude,
            pharmacy.longitude
          );
          return {...pharmacy, distance};
        })
        .sort((a, b) => a.distance - b.distance);
      setUpdatedPharmacies(pharmaciesWithDistance);
    }
  }, [pharmacies, userLocation, getDistanceFromLatLonInKm]);

  const cityOptions = data.map((city) => {
    return {value: city.citySlug, label: city.cityName};
  });

  const handleChangeCity = (selectedOption) => {
    setSelectedCity(selectedOption?.value || '');
    setSelectedCounty('');

    if (selectedOption?.value) {
      const counties = data.find(
        (d) => d.citySlug === selectedOption?.value
      ).counties;

      setCountyOptions(
        counties.map((county) => {
          return {
            value: county.countySlug,
            label: county.countyName,
          };
        })
      );
    }
  };

  const handleChangeCounty = (selectedOption) => {
    setSelectedCounty(selectedOption?.value || '');
  };

  const handleSubmitSearch = async () => {
    try {
      setIsFetching(true);
      const fetchedPharmacies = await fetchPharmacies({
        city: selectedCity?.toLowerCase(),
        county: selectedCounty?.toLowerCase(),
      });
      setPharmacies(fetchedPharmacies);

      if (selectedCity && selectedCounty) {
        navigate(
          `/${selectedCity.toLowerCase()}/${selectedCounty.toLowerCase()}`
        );
      } else if (selectedCity) {
        navigate(`/${selectedCity.toLowerCase()}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Earth's radius in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c; // Distance in km
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <div>
      <PharmacyForm
        cityOptions={cityOptions}
        countyOptions={countyOptions}
        handleChangeCity={handleChangeCity}
        handleChangeCounty={handleChangeCounty}
        selectedCity={selectedCity}
        selectedCounty={selectedCounty}
        handleSubmit={handleSubmitSearch}
        disabled={isFetching}
      />
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <PharmacyTable pharmacies={updatedPharmacies} />
      )}
    </div>
  );
}

export default Main;
