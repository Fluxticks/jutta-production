const charCount = (string) => {
  return [...string].length;
};

const getTextParts = (firstText, secondText, maxLength = 27) => {
  if (charCount(firstText) + charCount(secondText) < maxLength) {
    return [firstText + secondText, undefined];
  } else if (secondText.includes("&")) {
    const parts = secondText.split("&");
    if (charCount(firstText) + charCount(parts[0]) < maxLength) {
      return [firstText + parts[0] + " &", parts[1]];
    }
  }
  return [firstText, secondText];
};

export { charCount, getTextParts };
