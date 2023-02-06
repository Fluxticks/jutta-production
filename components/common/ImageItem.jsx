import style from "./styles/ImageItem.module.css";
import Image from "./Image";

const ImageItem = ({
  children,
  title = "Image Title",
  subtext = "Item Subtext | Extra",
  imagePath = undefined,
  onClick = undefined,
}) => {
  const size = "250px";
  return (
    <div className={style.container} style={{ width: size }}>
      <div onClick={onClick} className={style.pointer}>
        <Image size={size} imagePath={imagePath} />
      </div>
      <h2>{subtext}</h2>
      {children}
      <h4 className={style.name}>{title}</h4>
    </div>
  );
};

export default ImageItem;
