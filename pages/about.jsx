import style from "../styles/pages/About.module.css";
import Button from "../components/common/Button";
import { loadAboutText } from "../lib/dataLoader";

const About = ({ text }) => {
  return (
    <div className={style.container}>
      <div className={style.image_overlay}>
        <div
          className={style.info_image}
          style={{ "--bg-url": `url(${text.portraitPath})` }}
        />
      </div>
      <div className={style.description}>
        <div className={style.info_text}>
          <h1>{text.title}</h1>
          <div
            className={style.info_body}
            dangerouslySetInnerHTML={{
              __html: text.content,
            }}
          />
        </div>
        <div className={style.buttons}>
          <Button text="zur Galerie" href="/" />
          <Button text="Kontaktiere mich" href="/shop#contact" />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  const text = await loadAboutText();
  return {
    props: {
      text,
    },
  };
}

export default About;
