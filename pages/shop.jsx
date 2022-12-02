import style from "../styles/pages/Shop.module.css";
import ShopSection from "../components/ShopSection";
import ContactForm from "../components/ContactForm";
import {
  loadArtForms,
  loadShopConfig,
  loadShopImages,
} from "../lib/dataLoader";

const Shop = ({ artForms, images, contactText }) => {
  return (
    <div className={style.container}>
      <ShopSection artForms={artForms} items={images} />
      <ContactForm text={contactText} />
    </div>
  );
};

export async function getStaticProps(context) {
  const defaultArtForms = [
    {
      displayName: "Porzellan",
      sortName: "porzellan",
      tagLine: "Porzellan Tag Line",
      imagePath: undefined,
      content: "<strong>Hello</strong> and welcome to this section",
    },
    {
      displayName: "Raku",
      sortName: "raku",
      tagLine: "Raku Tag Line",
      imagePath: undefined,
      content: "<strong>This</strong> is another section that is welcome!",
    },
    {
      displayName: "Ton & Keramik",
      sortName: "ton",
      tagLine: "Ton Tag Line",
      imagePath: undefined,
      content:
        "<strong>And</strong> yet another section that I have created...",
    },
  ];

  let artForms = await loadArtForms();
  const shopConfig = await loadShopConfig();
  const images = loadShopImages();

  if (artForms === undefined || artForms.length === 0) {
    artForms = defaultArtForms;
  }

  if (shopConfig !== undefined) {
    for (var form in shopConfig.dontShowForms) {
      delete artForms[form];
    }
  }
  return {
    props: {
      artForms,
      images,
      contactText: shopConfig.content,
    },
  };
}

export default Shop;
