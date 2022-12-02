import style from "./styles/Button.module.css";

const Button = ({ text, href, onClick }) => {
  if (onClick !== undefined) {
    return (
      <a onClick={onClick} className={style.container}>
        <div className={style.background} />
        <span className={style.text}>{text}</span>
      </a>
    );
  } else {
    return (
      <a href={href} className={style.container}>
        <div className={style.background} />
        <span className={style.text}>{text}</span>
      </a>
    );
  }
};

export default Button;
