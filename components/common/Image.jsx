import { useRef } from "react";
import style from "./styles/Image.module.css";

const Image = ({
  imagePath = "https://via.placeholder.com/",
  altText = "Placeholder alt text",
  loadingStyle = "lazy",
  size = "250px",
}) => {
  if (imagePath.endsWith("placeholder.com/")) {
    const sizeText = size.replace("px", "");
    imagePath = `${imagePath}${sizeText}`;
    altText = `Placeholder ${sizeText}x${sizeText} image`;
  }
  const imageRef = useRef(null);
  const onErrorHandle = () => {
    imageRef.current.src = `https://via.placeholder.com/${size.replace(
      "px",
      ""
    )}`;
  };
  return (
    <div
      className={style.container}
      style={{
        "--image-size": size,
      }}
    >
      <img
        className={style.image}
        src={imagePath}
        alt={altText}
        loading={loadingStyle}
        onError={onErrorHandle}
        ref={imageRef}
      />
    </div>
  );
};

export default Image;
