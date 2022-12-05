import { useEffect, useRef, useState } from "react";
import { updateBarPosition } from "../lib/common";
import FullscreenPreview from "./common/FullscreenPreview";
import ShopItem from "./common/ShopItem";
import style from "./styles/ShopSection.module.css";

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

const ShopNav = ({
  currentState,
  showAll,
  setShowAll,
  setCurrent,
  options,
}) => {
  const barRef = useRef(null);

  const updateBar = () => {
    updateBarPosition(`${style.nav_item} ${style.nav_active_item}`, barRef);
  };

  useEffect(() => {
    window.addEventListener("resize", updateBar);
    document.fonts.ready.then(updateBar);
    return () => {
      window.removeEventListener("resize", updateBar);
    };
  }, []);

  useEffect(() => {
    updateBar();
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
            name={displayName}
            key={index}
            isActive={!showAll && currentState === index + 1}
            clickHandler={() => {
              setCurrent(index + 1);
            }}
          />
        ))}
      </ul>
      <span ref={barRef} className={style.nav_highlight} />
    </>
  );
};

const ShopGallery = ({ items, filterBy, artForms }) => {
  const [previewIndex, setPreviewIndex] = useState(0);

  if (items === undefined || items.length === 0) {
    if (process.env.NEXT_PUBLIC_ENABLE_DEBUG_IMAGES) {
      items = Array.from(Array(12), () => ({
        name: undefined,
        category: undefined,
        dimensions: undefined,
        price: undefined,
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
          subTextFormatter={[
            {
              key: "price",
            },
          ]}
        />
      ) : (
        <></>
      )}
      {items.length > 0 ? (
        <div className={style.image_grid}>
          {items.map(
            ({ name, category, dimensions, price, fullPath }, index) => (
              <ShopItem
                key={index}
                title={name}
                category={
                  artForms[category] !== undefined
                    ? artForms[category].displayName
                    : undefined
                }
                dimensions={dimensions}
                price={price}
                imagePath={fullPath}
                onClick={() => {
                  setPreviewIndex(index + 1);
                }}
              />
            )
          )}
        </div>
      ) : (
        <div className={style.empty_list}>
          Momentan ist diese Kategorie in meinem kleinen Laden ausverkauft -
          bitte schau später nochmal rein!
        </div>
      )}
    </>
  );
};

const ShopSection = ({ artForms, items }) => {
  const [currentState, setState] = useState(0);
  const [showAll, setShowAll] = useState(true);
  const setCurrent = (index) => {
    setShowAll(false);
    setState(index);
  };
  return (
    <div className={style.container}>
      <ShopNav
        currentState={currentState}
        showAll={showAll}
        setShowAll={setShowAll}
        setCurrent={setCurrent}
        options={artForms}
      />
      <ShopGallery
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

export default ShopSection;
