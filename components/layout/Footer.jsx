import Link from "next/link";
import style from "./styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.footer_content}>
        <div />
        <p className={style.tag_line}>...Freude teilen!</p>
      </div>
      <div className={style.advert}>
        Website made by Benji Garment
        <p>|</p>
        <Link href="https://github.com/Fluxticks">
          <a>GitHub / Contact Me</a>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
