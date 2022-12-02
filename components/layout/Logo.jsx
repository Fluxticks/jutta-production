import style from "./styles/Logo.module.css";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <a className={style.container} aria-label="Go to Home">
        <div className={style.logo_background}>
          <div className={style.logo} />
        </div>
        <h1 className={style.page_name}>Jutta Zihla</h1>
      </a>
    </Link>
  );
};

export default Logo;
