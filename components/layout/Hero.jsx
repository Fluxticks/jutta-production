import style from "./styles/Hero.module.css";

const Hero = ({ bgImage = "/hero/heromain.webp", titleText, subText }) => {
  return (
    <div className={style.container} style={{ "--bg-url": `url(${bgImage})` }}>
      <h1 className={style.title_text}>{titleText}</h1>
      <p className={style.sub_text}>{subText}</p>
    </div>
  );
};

export default Hero;
