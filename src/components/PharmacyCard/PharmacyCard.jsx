import {useEffect, useState} from 'react';
import './PharmacyCard.style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHouseMedical,
  faLocationDot,
  faMapLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

function PharmacyCard({
  pharmacyName,
  city,
  county,
  address,
  phone1,
  pharmacyId,
  distance,
  setShowModal,
  handleClickShowOnMap,
}) {
  return (
    <div className="pharmacy-card p-5 w-full ">
      <div className="flex items-start gap-2 mb-3">
        <FontAwesomeIcon
          className="text-gray-600 "
          size="xl"
          icon={faHouseMedical}
        />
        <h1 className="text-xl font-bold w-fulloverflow-hidden whitespace-nowrap text-ellipsis">
          {pharmacyName}
        </h1>
      </div>
      <ul className="flex flex-col gap-3 h-full">
        <div className="flex items-start gap-2 mt-2">
          <FontAwesomeIcon
            className="text-gray-600 mt-1 "
            icon={faLocationDot}
          />
          <li>
            {city} - {county}
          </li>
        </div>
        <div className="flex items-start gap-2 mt-2">
          <FontAwesomeIcon
            className="text-gray-600 mt-1 "
            icon={faMapLocationDot}
          />
          <li className="address text-ellipsis overflow-hidden">{address}</li>
        </div>
        <div className="flex items-start  gap-2 mt-2">
          <FontAwesomeIcon className="text-gray-600 mt-1 " icon={faPhone} />
          <a href={`tel:${phone1}`} className="text-sky-600 underline">
            {phone1}
          </a>
        </div>
        <div className="flex items-start  gap-2 mt-2">
        <a>{distance && (
            <b>{`Mesafe: ${distance.toFixed(2)} km`}</b>
          )}</a>
        </div>
        <li>
          <button
            onClick={() => handleClickShowOnMap(pharmacyId)}
            className="btn bg-blue w-full p-2 "
          >
            Haritada Goster
          </button>
        </li>
      </ul>
    </div>
  );
}

export default PharmacyCard;
