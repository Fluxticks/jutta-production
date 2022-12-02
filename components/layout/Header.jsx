import Link from "next/link";
import Logo from "./Logo";
import Nav from "./Nav";
import Socials from "./Socials";
import style from "./styles/Header.module.css";

const Header = ({ routes }) => {
  return (
    <div className={style.header}>
      <Logo />
      <Nav>
        {routes.map(({ name, href }, index) => (
          <Link key={index} href={href}>
            <a>{name}</a>
          </Link>
        ))}
      </Nav>
      <Socials />
    </div>
  );
};

export default Header;
