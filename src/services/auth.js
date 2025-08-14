// services/auth.js
import API from './api';

export const login = (email, password) =>
  API.post('/login', { email, password });

export const signup = async ({
  fullName,
  email,
  password,
  contact,
  companyName,
  businessType,
  teamSize,
  yearsInBusiness
}) => {
  const cleanedContact = contact.replace(/\D/g, '').trim();

  if (cleanedContact.length !== 10) {
    throw new Error("Contact number must be exactly 10 digits");
  }

  return API.post('/signup', {
    fullName: fullName.trim(),
    email: email.trim(),
    password,
    contact: cleanedContact,
    companyName: companyName.trim(),
    businessType: businessType.trim(),
    teamSize: teamSize.trim(),
    yearsInBusiness: yearsInBusiness.trim(),
  });
};
