import axios from 'axios';

export const fetchPharmacies = async ({city = '', county = ''}) => {
  const {data} = await axios.get(
    `${process.env.REACT_APP_PHARMACY_API}/pharmacies?city=${city}&county=${county}`
  );

  return data;
};

export const fetchPharmacy = async (pharmacyId) => {
  return await axios.get(
    `${process.env.REACT_APP_PHARMACY_API}/pharmacies/${pharmacyId}`
  );
};
