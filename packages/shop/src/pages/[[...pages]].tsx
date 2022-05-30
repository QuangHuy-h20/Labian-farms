import Banner from "@components/banners/banner";
import { ThumbsCarousel } from "@components/ui/thumbs-carousel";
import { gallery as gallery } from "@utils/gallery";
import { Element, scroller } from "react-scroll";
import Products from "@components/products";
import Categories from "@components/categories";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useWindowSize } from "@lib/use-window-size";
import dynamic from "next/dynamic";
const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

const Home = () => {
  const { query } = useRouter();
  const { width } = useWindowSize();

  useEffect(() => {
    if (query.text || query.category) {
      scroller.scrollTo("grid", {
        smooth: true,
        offset: -110,
      });
    }
  }, [query.text, query.category]);
  return (
    <>
      <Banner />
      <ThumbsCarousel gallery={gallery} />
      <Element
        name="grid"
        className="flex h-screen-100 w-full border-t border-gray-200 border-opacity-70"
      >
        <Categories />
        <Products className="p-8" />
      </Element>
      {width > 1023 && <CartCounterButton />}
    </>
  );
};

export default Home;
