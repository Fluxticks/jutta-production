import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import style from "./styles/FullscreenPreview.module.css";
import Image from "./Image";
import Button from "./Button";
import path from "path";

const FullscreenPreview = ({
  items,
  artForms,
  setVisible,
  startingIndex,
  subTextFormatter,
}) => {
  const [currentIndex, setIndex] = useState(startingIndex - 1);

  const isValidIndexUpdate = (delta) => {
    return currentIndex + delta >= 0 && currentIndex + delta < items.length;
  };

  const updateIndex = (delta) => {
    if (isValidIndexUpdate(delta)) {
      setIndex(currentIndex + delta);
    }
  };

  const hidePreview = () => {
    const newStyle = {
      overflow: "auto",
      height: "auto",
    };
    Object.assign(document.body.style, newStyle);
    setVisible(0);
  };

  useLayoutEffect(() => {
    const newStyle = {
      overflow: "hidden",
      height: "100%",
    };
    Object.assign(document.body.style, newStyle);
  }, []);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      hidePreview();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  let subText = `${artForms[items[currentIndex].category].displayName} | ${
    items[currentIndex].dimensions
  }`;

  if (subTextFormatter !== undefined) {
    for (let format of subTextFormatter) {
      subText += ` | ${items[currentIndex][format.key]}`;
    }
  }

  return (
    <div className={style.container}>
      <div className={style.top_text}>
        <h2>{items[currentIndex].name}</h2>
        <h3>{subText}</h3>
      </div>
      <div className={style.preview_content}>
        <button
          onClick={() => {
            const delta = -1;
            isValidIndexUpdate(delta) ? updateIndex(delta) : () => {};
          }}
          className={`${style.button_left} ${style.button} ${
            !isValidIndexUpdate(-1) ? style.button_inactive : undefined
          }`}
        >
          <svg
            className={style.arrow}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 80"
          >
            <polyline
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="45.63,75.8 0.375,38.087 45.63,0.375 "
            />
          </svg>
        </button>
        <div className={style.preview_image}>
          <img
            src={items[currentIndex].fullPath}
            alt={`${items[currentIndex].name} large preview image`}
          />
        </div>
        <button
          onClick={() => {
            const delta = 1;
            isValidIndexUpdate(delta) ? updateIndex(delta) : () => {};
          }}
          className={`${style.button_right} ${style.button} ${
            !isValidIndexUpdate(1) ? style.button_inactive : undefined
          }`}
        >
          <svg
            className={style.arrow}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 80"
          >
            <polyline
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0.375,0.375 45.63,38.087 0.375,75.8 "
            />
          </svg>
        </button>
      </div>
      <div className={style.bottom_text}>
        <h4>{`${currentIndex + 1} / ${items.length}`}</h4>
      </div>
      <div className={style.exit_button} onClick={hidePreview}>
        {"X"}
      </div>
      <div className={style.background} onClick={hidePreview} />
    </div>
  );
};

export default FullscreenPreview;
