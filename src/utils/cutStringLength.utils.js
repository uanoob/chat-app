export const cutStringLength = (string) => {
  const length = 140;
  return string.length > length
    ? `${string.substring(0, length - 3)}...`
    : string;
};

export default cutStringLength;
