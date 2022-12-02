import ImageItem from "./ImageItem";

import { getTextParts } from "../../lib/common";

const ShopItem = ({
  title = "Image Title",
  category = "Item Category",
  dimensions = "5cm x 5cm",
  price = "0.00",
  imagePath = undefined,
  onClick,
}) => {
  const [subtext, dimensionText] = getTextParts(
    `${category} | ${price} | `,
    dimensions
  );

  if (imagePath === undefined) {
    return (
      <ImageItem title={title} subtext={subtext}>
        <h2>{dimensionText}</h2>
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
        <h2>{dimensionText}</h2>
      </ImageItem>
    );
  }
};

export default ShopItem;
