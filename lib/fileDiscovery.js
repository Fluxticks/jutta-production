import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

function discoverImageFiles(directory, imageType) {
  const directoryPath = path.join(process.cwd(), "public", directory);

  let discoveredImages = undefined;
  const regex = new RegExp(`\.(${imageType})`, "gi");
  try {
    discoveredImages = fs.readdirSync(directoryPath);
    discoveredImages = discoveredImages.filter((elem) => elem.match(regex));
  } catch {
    discoveredImages = [];
  }

  return [directoryPath, discoveredImages];
}

function discoverMdFiles(directory) {
  const directoryPath = path.join(process.cwd(), "public", directory);

  let discoveredMds = undefined;
  try {
    discoveredMds = fs.readdirSync(directoryPath);
    discoveredMds = discoveredMds.filter((elem) => elem.match(/\.(mdx?)/gi));
  } catch (error) {
    discoveredMds = [];
  }

  return [directoryPath, discoveredMds];
}

async function parseMdFile(directoryPath, fileName) {
  const rawFileContents = fs.readFileSync(
    path.join(directoryPath, fileName),
    "utf-8"
  );

  const matterResult = matter(rawFileContents);
  const fileHeaders = matterResult.data;
  let content = matterResult.content;
  if (fileHeaders.html === true) {
    content = (await remark().use(html).process(content)).toString();
  }

  return {
    ...fileHeaders,
    content,
    fileName,
    directoryPath,
  };
}

export { discoverImageFiles, discoverMdFiles, parseMdFile };
