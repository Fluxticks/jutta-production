import style from "./styles/GallerySection.module.css";
import GalleryItem from "./common/GalleryItem";
import Image from "./common/Image";
import { useEffect, useState } from "react";
import FullscreenPreview from "./common/FullscreenPreview";

const ArtForms = ({ currentState, setCurrent, options }) => {
  return (
    <div className={style.artform_section}>
      <div className={style.artform_images}>
        {Object.values(options).map(
          ({ displayName, sortName, tagLine, imagePath }, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrent(index + 1);
              }}
              className={style.artform_container}
            >
              <h2
                className={
                  currentState - 1 === index ? style.artform_active_text : null
                }
              >
                {displayName}
              </h2>
              <h4>{tagLine}</h4>
              <div
                className={`${style.artform_image} ${
                  currentState - 1 === index ? style.artform_active : null
                }`}
              >
                <Image
                  size="350px"
                  altText={`${displayName} art form option image`}
                  imagePath={imagePath}
                  loadingStyle="eager"
                />
              </div>
            </div>
          )
        )}
      </div>
      <div className={style.artform_info}>
        <h1 className={style.artform_info_title}>
          {options[Object.keys(options)[currentState - 1]].displayName}
        </h1>
        <div
          className={style.artform_info_description}
          dangerouslySetInnerHTML={{
            __html: options[Object.keys(options)[currentState - 1]].content,
          }}
        />
      </div>
    </div>
  );
};

const NavItem = ({ name, isActive, clickHandler }) => {
  return (
    <li
      className={`${style.nav_item} ${isActive ? style.nav_active_item : null}`}
      onClick={clickHandler}
    >
      {name}
    </li>
  );
};

const GalleryNav = ({
  currentState,
  showAll,
  setShowAll,
  setCurrent,
  options,
}) => {
  const updateState = () => {
    const activeItem = document.getElementsByClassName(
      `${style.nav_item} ${style.nav_active_item}`
    )[0];
    if (activeItem === undefined) {
      return;
    }

    const itemBounds = activeItem.getBoundingClientRect();
    const headerBar = document.getElementsByClassName(style.nav_highlight)[0];

    const newStyle = {
      display: "block",
      left: `${itemBounds.left}px`,
      top: `${activeItem.offsetTop + itemBounds.height}px`,
      width: `${itemBounds.width}px`,
    };
    Object.assign(headerBar.style, newStyle);
  };

  useEffect(() => {
    updateState();
  }, [currentState, showAll]);
  return (
    <>
      <ul className={style.nav_container}>
        <NavItem
          name="Alle zeigen"
          isActive={showAll}
          clickHandler={() => {
            setShowAll(!showAll);
          }}
        />
        {Object.values(options).map(({ displayName }, index) => (
          <NavItem
            key={index}
            name={displayName}
            isActive={!showAll && currentState === index + 1}
            clickHandler={() => {
              setCurrent(index + 1);
            }}
          />
        ))}
      </ul>
      <span className={style.nav_highlight} />
    </>
  );
};

const ImageGallery = ({ items, filterBy, artForms }) => {
  const [previewIndex, setPreviewIndex] = useState(0);

  if (items === undefined || items.length === 0) {
    console.log(
      "🚀 ~ file: GallerySection.jsx:131 ~ ImageGallery ~ process.env.ENABLE_DEBUG_IMAGES",
      process.env.NEXT_PUBLIC_ENABLE_DEBUG_IMAGES
    );
    if (process.env.NEXT_PUBLIC_ENABLE_DEBUG_IMAGES) {
      items = Array.from(Array(12), () => ({
        name: undefined,
        category: undefined,
        dimensions: undefined,
        fullPath: undefined,
      }));
    } else {
      items = [];
    }
  } else {
    items =
      filterBy === undefined
        ? items
        : items.filter((x) => x.category === filterBy);
  }

  return (
    <>
      {previewIndex ? (
        <FullscreenPreview
          items={items}
          artForms={artForms}
          startingIndex={previewIndex}
          setVisible={setPreviewIndex}
        />
      ) : (
        <></>
      )}
      {items.length > 0 ? (
        <div className={style.image_grid}>
          {items.map(({ name, category, dimensions, fullPath }, index) => (
            <GalleryItem
              key={index}
              title={name}
              category={
                artForms[category] !== undefined
                  ? artForms[category].displayName
                  : undefined
              }
              dimensions={dimensions}
              imagePath={fullPath}
              onClick={() => {
                setPreviewIndex(index + 1);
              }}
            />
          ))}
        </div>
      ) : (
        <div className={style.empty_list}>
          No items currently available, try coming back later!
        </div>
      )}
    </>
  );
};

const GallerySection = ({ artForms, items }) => {
  const [currentState, setState] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const setCurrent = (index) => {
    setShowAll(false);
    setState(index);
  };
  return (
    <div className={style.container}>
      <ArtForms
        currentState={currentState}
        setCurrent={setCurrent}
        options={artForms}
      />
      <GalleryNav
        currentState={currentState}
        showAll={showAll}
        setShowAll={setShowAll}
        setCurrent={setCurrent}
        options={artForms}
      />
      <ImageGallery
        items={items}
        filterBy={
          showAll
            ? undefined
            : artForms[Object.keys(artForms)[currentState - 1]].sortName
        }
        artForms={artForms}
      />
    </div>
  );
};

export default GallerySection;
