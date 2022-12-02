import ImageItem from "./ImageItem";
import { getTextParts } from "../../lib/common";

const GalleryItem = ({
  title = "Image Title",
  category = "Item Category",
  dimensions = "5cm x 5cm",
  imagePath = undefined,
  onClick,
}) => {
  const [subtext, itemDimension] = getTextParts(`${category} | `, dimensions);

  if (imagePath === undefined) {
    return (
      <ImageItem title={title} subtext={subtext}>
        <h2>{itemDimension}</h2>
      </ImageItem>
    );
  } else {
    return (
      <ImageItem
        title={title}
        subtext={subtext}
        imagePath={imagePath}
        onClick={onClick}
      >
        <h2>{itemDimension}</h2>
      </ImageItem>
    );
  }
};

export default GalleryItem;
