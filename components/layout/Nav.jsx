import { useRouter } from "next/router";
import { useEffect } from "react";
import style from "./styles/Nav.module.css";

const navOnClick = (event) => {
  const parentLi = event.target.parentElement;
  if (parentLi.localName !== "li") {
    return;
  }
  if (parentLi.classList.contains(style.active_child)) {
    return;
  } else {
    parentLi.parentElement.childNodes.forEach((element) => {
      element.classList.remove(style.active_child);
    });
  }
  updateActive(parentLi);
};

const updateActive = (element) => {
  [...document.getElementsByClassName(`${style.active_child}`)].forEach(
    (element) => {
      element.classList.remove(style.activeChild);
    }
  );
  element.classList.add(style.active_child);
  updateBar(element);
};

const updateBar = (newItem) => {
  if (newItem === null) {
    newItem = document.getElementsByClassName(
      `${style.nav_item} ${style.active_child}`
    )[0];
    if (newItem === undefined) {
      return;
    }
  }
  const itemBounds = newItem.getBoundingClientRect();
  const headerBar = document.getElementById("header-underline");
  const new_style = {
    display: "block",
    left: `${itemBounds.left}px`,
    top: `${itemBounds.top + itemBounds.height}px`,
    width: `${itemBounds.width}px`,
  };
  Object.assign(headerBar.style, new_style);
};

const Nav = ({ children }) => {
  const currentRoute = useRouter().pathname;
  const activeChild = children.findIndex((x) => x.props.href === currentRoute);
  useEffect(() => {
    updateBar(null);
  }, []);
  return (
    <>
      <ul className={style.container} onClick={navOnClick}>
        {children.map((child, index) => (
          <NavItem key={index} isActive={index === activeChild}>
            {child}
          </NavItem>
        ))}
      </ul>
      <span id="header-underline" className={style.active_highlight} />
    </>
  );
};

const NavItem = ({ isActive, children }) => {
  if (isActive) {
    return (
      <li className={`${style.nav_item} ${style.active_child}`}>{children}</li>
    );
  } else {
    return <li className={style.nav_item}>{children}</li>;
  }
};

export default Nav;
