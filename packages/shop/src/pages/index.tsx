import Banner from "@components/banners/banner";
import { ThumbsCarousel } from "@components/ui/thumbs-carousel";
import { gallery as gallery } from "@utils/gallery";
import { Element } from "react-scroll";
import Products from "@components/products";
import Categories from "@components/categories";

export default function Home() {
  return (
    <>
      <Banner />
      <ThumbsCarousel gallery={gallery} />
      <Element
        name="grid"
        className="flex h-screen-85 w-full border-t border-gray-200 border-opacity-70"
      >
        <Categories />
        <Products  className="p-8"/>
      </Element>
    </>
  );
}
