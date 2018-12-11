export const stringToChar = (text) => {
  try {
    return text
      .split(' ')
      .map(word => word[0])
      .map(char => char.toUpperCase())
      .slice(0, 2)
      .join('');
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
    return '🐶';
  }
};

export default stringToChar;
