export const checkValidityLength = (name, value) => {
  const limits = {
    name: { min: 3, max: 20 },
    password: { min: 3, max: 100 },
    title: { min: 2, max: 100 },
    text: { min: 20, max: 2000 },
    comment: { min: 3, max: 250 },
  };
  let isValid = true;
  isValid = value.trim() !== '' && isValid;
  isValid = value.length >= limits[name].min && isValid;
  isValid = value.length <= limits[name].max && isValid;
  return isValid;
};

export const checkValidityEmail = (email) => {
  // eslint-disable-next-line
  const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return reg.test(email.trim());
};
