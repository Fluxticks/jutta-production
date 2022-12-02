import path from "path";

const parseImage = (filePath, imageKeys, directory = undefined) => {
  // imageKeys format:
  /*
    {
        key: {
            replaceWith: `string` [optional]
            formatter: `function` [optional]
            partIndex: `int`
        }
    }
    */
  const fileParts = filePath.split("_");
  const escapeChar = "~";
  const hyphenRegex = `(?<!${escapeChar})-`;
  const escapeRegex = `${escapeChar}(?=-)`;

  const replaceWithRegex = new RegExp(hyphenRegex, "gi");
  const cleanupRegex = new RegExp(escapeRegex, "gi");

  let image = {};
  for (let [key, data] of Object.entries(imageKeys)) {
    let imageValue = fileParts[data.partIndex];
    if (imageValue.includes(".")) {
      imageValue = imageValue.split(".")[0];
    }
    imageValue = imageValue.replaceAll(
      replaceWithRegex,
      data.replaceWith === undefined ? " " : data.replaceWith
    );
    imageValue = imageValue.replaceAll(cleanupRegex, "");

    if (data.formatter !== undefined) {
      imageValue = data.formatter(imageValue);
    }
    image[key] = imageValue;
  }

  if (directory !== undefined) {
    image["fullPath"] = path.join(directory, filePath);
  }
  image["fileName"] = filePath;
  return image;
};

export { parseImage };
