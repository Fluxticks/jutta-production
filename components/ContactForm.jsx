import style from "./styles/ContactForm.module.css";
import Button from "./common/Button";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { charCount } from "../lib/common";
import PopupBox from "./common/PopupBox";

const DEFAULT_BUTTON_TEXT = "E-Mail senden";
const BUTTON_COOLDOWN_TEXT = "Bitte warten...";

const LOCAL_STORAGE_KEY = "user-form-data";

const ContactForm = ({ text }) => {
  const formRef = useRef();
  const buttonRef = useRef();
  const [clickAllowed, setClickAllowed] = useState(true);
  const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT);
  const [showPopup, setPopupVisible] = useState(false);
  const [popupInfo, setPopupInfo] = useState({
    title: "Popup",
    message: "Default message",
  });

  const resetButton = () => {
    setButtonText(DEFAULT_BUTTON_TEXT);
    buttonRef.current.classList.remove(style.progress);
    setClickAllowed(true);
  };

  const resetForm = (cooldownValue) => {
    var currentCooldown = cooldownValue;
    const interval = setInterval(() => {
      if (currentCooldown > 0) {
        setButtonText(
          BUTTON_COOLDOWN_TEXT.replace("...", " ") +
            `(${Math.trunc(currentCooldown / 1000)}s)`
        );
        currentCooldown -= 1000;
      } else {
        resetButton();
        clearInterval(interval);
      }
    }, 1000);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setClickAllowed(false);
    setButtonText(BUTTON_COOLDOWN_TEXT);
    buttonRef.current.classList.add(style.progress);

    const validForm = Array.from(formRef.current.elements).every(
      (x) => charCount(x.value) > 0
    );

    const onError = (title = "Error!", message) => {
      setPopupInfo({
        title: title,
        message: message,
      });
      setPopupVisible(true);
      resetForm(10000);
    };

    const onSuccess = () => {
      Array.from(formRef.current.elements).forEach((elem) => {
        elem.value = "";
      });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setPopupInfo({
        title: "E-Mail verschickt!",
        message: "Ihre E-Mail wurde versendet und wird zeitnah beantwortet!",
      });
      setPopupVisible(true);
      resetForm(60000);
    };

    const servicID = process.env.NEXT_PUBLIC_EMAIL_SERVICE;
    const templateID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE;
    const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBKEY;

    if (validForm) {
      emailjs.sendForm(servicID, templateID, formRef.current, publicKey).then(
        (result) => {
          onSuccess();
        },
        (error) => {
          onError(
            "Error!",
            "Die E-Mail konnte nicht gesendet werden, bitte versuchen Sie es später noch einmal."
          );
        }
      );
    } else {
      onError(
        "Fehlende Informationen!",
        "Bitte achten Sie darauf, alle Felder auszufüllen!"
      );
    }
  };

  const updateLocalStorage = () => {
    let formData = {};
    for (let item of formRef.current.elements) {
      formData[item.name] = item.value;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  };

  const retrieveLocalStorage = () => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      for (let item of formRef.current.elements) {
        item.value = data[`${item.name}`];
      }
    }
  };

  useEffect(() => {
    if (buttonRef.current !== undefined) {
      buttonRef.current.classList.remove(style.progress);
    }
    retrieveLocalStorage();
  }, []);

  return (
    <>
      {showPopup ? (
        <PopupBox {...popupInfo} setVisible={setPopupVisible} />
      ) : (
        <></>
      )}
      <div className={style.container}>
        <h2 id="contact" className={style.header}>
          Kontaktiere mich!
        </h2>
        <div className={style.contact_container}>
          <form
            ref={formRef}
            className={style.left}
            onChange={updateLocalStorage}
          >
            <div className={style.input_item}>
              <label htmlFor="clientName">Name</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                placeholder="Vorname Nachname"
              />
            </div>

            <div className={style.input_item}>
              <label htmlFor="clientEmail">E-Mail</label>
              <input
                type="text"
                id="clientEmail"
                name="clientEmail"
                placeholder="adresse@mail.com"
              />
            </div>
            <div className={style.input_item}>
              <label htmlFor="clientMessage">Text</label>
              <textarea
                id="clientMessage"
                name="clientMessage"
                placeholder="Deine Nachricht..."
              />
            </div>
            <div className={style.button_placement}>
              <div
                ref={buttonRef}
                className={`${style.button_area} ${style.progress}`}
              >
                <Button
                  text={buttonText}
                  onClick={(e) => {
                    clickAllowed ? sendEmail(e) : null;
                  }}
                />
              </div>
            </div>
          </form>
          <div className={style.right}>
            <div className={style.contact_items}>
              {text !== undefined ? (
                <div
                  className={style.contact_description}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              ) : (
                <></>
              )}
              <div className={style.contact_info}>
                <h1>Telefonnummer:</h1>
                <a href="tel:+4917642489643">
                  <h2>+49 176 424 89 643</h2>
                </a>
              </div>
              <div className={style.contact_info}>
                <h1>E-Mail:</h1>
                <a href="mailto:jutta@meine-kleine-manufaktur.de">
                  <h2>jutta@meine-kleine-manufaktur.de</h2>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
