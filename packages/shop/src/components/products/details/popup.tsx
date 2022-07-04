import Spinner from "@components/ui/loaders/spinner/spinner";
import Details from "./details";
import ShortDetails from "./short-details";
import { stickyShortDetailsAtom } from "@store/sticky-short-details-atom";
import { useAtom } from "jotai";
import { AttributesProvider } from "./attributes.context";
import { useProductQuery } from "@generated/graphql";

interface ProductPopupProps {
  productId: string;
}

const Popup: React.FC<ProductPopupProps> = ({ productId }) => {
  const [showStickyShortDetails] = useAtom(stickyShortDetailsAtom);
  console.log(productId);
  
  const { data, loading } = useProductQuery({
    variables: { id: productId },
  });

  if (loading || !data?.product!)
    return (
      <div className="relative flex items-center justify-center w-96 h-96 bg-white">
        <Spinner />
      </div>
    );

  return (
    <AttributesProvider>
      <article className="bg-white w-full max-w-6xl xl:min-w-[1152px] relative z-[51] md:rounded-xl">
        {/* Sticky bar */}
        <ShortDetails
          product={data?.product!}
          isSticky={showStickyShortDetails as boolean}
        />
        {/* End of sticky bar */}
        <Details product={data?.product!} backBtn={false} isModal={true} />
      </article>
    </AttributesProvider>
  );
};

export default Popup;
