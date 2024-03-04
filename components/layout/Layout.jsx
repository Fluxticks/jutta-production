import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import style from "./styles/Layout.module.css";
import Button from "../common/Button";

const Layout = ({ children }) => {
  const routes = [
    {
      href: "/",
      name: "Start",
      header: "Meine kleine Manufaktur",
      description: "Ton & Porzellan",
      image: "/hero/heromain.webp",
    },
    {
      href: "/shop",
      name: "Laden",
      header: "Mein kleiner Laden",
      description: "… Freude teilen!",
      image: "/hero/heroshop.webp",
    },
    {
      href: "/about",
      name: "Über mich",
      header: "Meine kleine Geschichte",
      description: "Über mich",
      image: "/hero/heroabout.webp",
    },
  ];

  const getCurrentPage = (currentRoute) => {
    if (currentRoute.includes("#")) {
      currentRoute = currentRoute.slice(0, currentRoute.indexOf("#"));
    }
    if (currentRoute.includes("?")) {
      currentRoute = currentRoute.slice(0, currentRoute.indexOf("?"));
    }

    let currentPageInfo = routes.find((x) => x.href === currentRoute);

    if (currentPageInfo === undefined) {
      currentPageInfo = routes[0];
    }

    let navText = currentPageInfo.name;
    let headerText = currentPageInfo.header;
    let subText = currentPageInfo.description;
    let heroImage = currentPageInfo.image;

    return {
      navText: navText,
      headerText: headerText === undefined ? navText : headerText,
      subText: subText === undefined ? "" : subText,
      heroImage: heroImage === undefined ? "/hero/heromain.webp" : heroImage,
    };
  };

  const currentRoute = useRouter().asPath;
  const { headerText, subText, heroImage } = getCurrentPage(currentRoute);
  const removeModalFromDOM = () => {
    const modal = document.getElementById("shopModalBanner");
    modal.parentNode.removeChild(modal);
  };

  return (
    <>
      <Head>
        <title>Jutta Zihla&apos;s kleine Manufaktur</title>
        <meta
          name="description"
          content="Jutta Zihla's kleine Manufaktur für Porzellan, Raku, Ton & Keramik"
        />
        <meta name="robots" content="all" />
        <meta property="og:title" content="Jutta Zihla's kleine Manufaktur" />
        <meta property="og:image" content="/logo.svg" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/logo.svg" />
        <link rel="preload" href={heroImage} as="image" />
      </Head>
      <div className={style.body_container}>
        <modal className={style.modal} id="shopModalBanner">
          <div className={style.modal_body}>
            <div className={style.modal_content}>
              <h5>Ich bin jetzt auch vor Ort!</h5>
              <br />
              <h1>Extra Fein</h1>
              <h2>im Veloon</h2>
              <br />
              <br />
              <h3>7 Künstlerinnen eine Vision</h3>
              <br />
              <br />
              <h4>Ab März 2024,</h4>
              <h4>
                in der Veloon Lounge in der Oberen Hainstrasse 2, 61440
                Oberursel
              </h4>
              <br />
              <img
                width="300px"
                height="300px"
                style={{
                  "--img": "url(/modalImage.webp)",
                }}
              />
            </div>
            <div className={style.close_button}>
              <Button
                onClick={() => {
                  removeModalFromDOM();
                }}
                text="Close"
              />
            </div>
          </div>
        </modal>
        <header>
          <Header routes={routes} />
          <Hero titleText={headerText} subText={subText} bgImage={heroImage} />
        </header>
        <main className={style.content_container}>{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
