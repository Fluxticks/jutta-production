import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
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
    const activeChildren = document.getElementsByClassName(
      `${style.nav_item} ${style.active_child}`
    );

    if (!activeChildren.length) {
      return;
    } else {
      var activeChild = activeChildren[0];
    }

    const itemBounds = activeChild.getBoundingClientRect();
    const newStyle = {
      display: "block",
      left: `${itemBounds.left}px`,
      top: `${itemBounds.top + itemBounds.height}px`,
      width: `${itemBounds.width}px`,
    };
    Object.assign(barRef.current.style, newStyle);
  };

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
