import {
  discoverImageFiles,
  discoverMdFiles,
  parseMdFile,
} from "./fileDiscovery";
import { parseImage } from "./structs";

async function loadArtForms(directory = "arttypes") {
  const [rootDirectory, files] = discoverMdFiles(directory);
  const artFiles = await Promise.all(
    files.map(async (file) => {
      return parseMdFile(rootDirectory, file);
    })
  );

  let artForms = {};
  for (let item of artFiles) {
    artForms[item.sortName] = item;
  }

  return artForms;
}

async function loadShopConfig(directory = "shop") {
  const [configDirectory, configFiles] = discoverMdFiles(directory);
  let configFile = undefined;
  if (configFiles.length !== 0) {
    configFile = await parseMdFile(configDirectory, configFiles[0]);
  }
  return configFile;
}

async function loadAboutText(directory = "about") {
  const [rootDirectory, files] = discoverMdFiles(directory);
  if (files.length !== 0) {
    return await parseMdFile(rootDirectory, files[0]);
  }
  return files;
}

function loadImages(
  directory,
  imageKeys,
  fileFormats = "jpe?g|png|gif|bmp|webp"
) {
  const [rootDirectory, files] = discoverImageFiles(directory, fileFormats);
  const images = files.map((elem) => parseImage(elem, imageKeys, directory));

  return images;
}

function loadGalleryImages(
  directory = "gallery",
  imageKeys = {
    category: {
      partIndex: 0,
    },
    itemIndex: {
      partIndex: 1,
      formatter: Number,
    },
    dimensions: {
      partIndex: 2,
      formatter: (elem) => {
        return elem.toLowerCase().replaceAll("d", "Ø").replaceAll("x", " x ");
      },
    },
    name: {
      partIndex: 3,
    },
  }
) {
  const galleryImages = loadImages(directory, imageKeys);
  galleryImages.sort((a, b) => {
    a.itemIndex - b.itemIndex;
  });
  return galleryImages;
}

function loadShopImages(
  directory = "shop",
  imageKeys = {
    category: {
      partIndex: 0,
    },
    itemIndex: {
      partIndex: 1,
      formatter: Number,
    },
    dimensions: {
      partIndex: 2,
      formatter: (elem) => {
        return elem.toLowerCase().replaceAll("d", "Ø").replaceAll("x", " x ");
      },
    },
    name: {
      partIndex: 3,
    },
    price: {
      partIndex: 4,
      replaceWith: " / ",
    },
  }
) {
  const shopImages = loadImages(directory, imageKeys);
  shopImages.sort((a, b) => {
    a.itemIndex - b.itemIndex;
  });
  return shopImages;
}

function loadAboutImages(
  directory = "about",
  imageKeys = {
    name: {
      partIndex: 0,
    },
  }
) {
  const images = loadImages(directory, imageKeys);
  return images;
}

export {
  loadArtForms,
  loadShopConfig,
  loadAboutText,
  loadGalleryImages,
  loadShopImages,
  loadAboutImages,
};
