import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { updateBarPosition } from "../../lib/common";
import style from "./styles/Nav.module.css";

const NavItem = ({ isActive, setActive, index, children }) => {
  return (
    <li
      className={`${style.nav_item} ${isActive ? style.active_child : null}`}
      onClick={() => {
        setActive(index);
      }}
    >
      {children}
    </li>
  );
};

const Nav = ({ children }) => {
  const currentRoute = useRouter().pathname;
  let currentActive = children.findIndex((x) => x.props.href === currentRoute);

  if (currentActive === undefined || currentActive === -1) {
    currentActive = 0;
  }

  const [activeIndex, setActiveIndex] = useState(currentActive);
  const barRef = useRef(null);

  const updateBar = () => {
    updateBarPosition(`${style.nav_item} ${style.active_child}`, barRef, false);
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
  }, [activeIndex]);

  return (
    <>
      <ul className={style.container}>
        {children.map((child, index) => (
          <NavItem
            key={index}
            isActive={index === activeIndex}
            setActive={setActiveIndex}
            index={index}
          >
            {child}
          </NavItem>
        ))}
      </ul>
      <span ref={barRef} className={style.active_highlight} />
    </>
  );
};

export default Nav;
