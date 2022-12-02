import style from "../styles/pages/Home.module.css";
import GallerySection from "../components/GallerySection";
import Button from "../components/common/Button";
import { loadGalleryImages, loadArtForms } from "../lib/dataLoader";

const Home = ({ artForms, images }) => {
  if (artForms === undefined || artForms.length === 0) {
    artForms = [
      {
        name: "Porzellan",
        tagLine: "Porzellan Tag Line",
        fileName: undefined,
        contentHtml: "<strong>Hello</strong> and welcome to this section",
      },
      {
        name: "Raku",
        tagLine: "Raku Tag Line",
        fileName: undefined,
        contentHtml:
          "<strong>This</strong> is another section that is welcome!",
      },
      {
        name: "Ton",
        tagLine: "Ton Tag Line",
        fileName: undefined,
        contentHtml:
          "<strong>And</strong> yet another section that I have created...",
      },
    ];
  }
  return (
    <div className={style.container}>
      <GallerySection artForms={artForms} items={images} />
      <div className={style.button}>
        <Button text="Zum Laden" href="/shop" />
      </div>
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
  const images = loadGalleryImages();

  if (artForms === undefined || artForms.length === 0) {
    artForms = defaultArtForms;
  }

  return {
    props: {
      artForms,
      images,
    },
  };
}

export default Home;
