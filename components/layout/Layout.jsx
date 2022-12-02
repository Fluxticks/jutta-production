import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import style from "./styles/Layout.module.css";

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
      <header>
        <Header routes={routes} />
        <Hero titleText={headerText} subText={subText} bgImage={heroImage} />
      </header>
      <main className={style.content_container}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
