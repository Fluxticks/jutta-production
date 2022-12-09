import { useCallback, useEffect, useLayoutEffect } from "react";
import Button from "./Button";
import style from "./styles/PopupBox.module.css";

const PopupBox = ({ title, message, setVisible }) => {
  const hidePopup = () => {
    const newStyle = {
      overflow: "auto",
      height: "auto",
    };
    Object.assign(document.body.style, newStyle);
    setVisible(false);
  };

  useLayoutEffect(() => {
    const noScroll = {
      overflow: "hidden",
      height: "100%",
    };
    Object.assign(document.body.style, noScroll);
  }, []);

  const escHandler = useCallback((event) => {
    if (event.key === "Escape") {
      hidePopup();
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", escHandler, false);

    return () => {
      document.removeEventListener("keydown", escHandler, false);
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.box_area}>
        <h1 className={style.title}>{title}</h1>
        <p className={style.message}>{message}</p>
        <Button text={"Close"} onClick={hidePopup} />
      </div>
      <div className={style.background} />
    </div>
  );
};

export default PopupBox;
