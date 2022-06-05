import { IosArrowDown } from "@components/icons/ios-arrow-down";
import { IosArrowUp } from "@components/icons/ios-arrow-up";

const StickerCard = ({
  titleTransKey,
  subtitleTransKey,
  icon,
  iconBgStyle,
  count,
  indicator,
  indicatorText,
  note,
  link,
  linkText,
}: any) => {
  return (
    <div className="flex flex-col w-full h-full p-7 rounded bg-white">
      <div className="w-full flex justify-between mb-auto pb-8">
        <div className="w-full flex flex-col">
          <span className="text-base text-gray-600 font-semibold mb-1">
            {titleTransKey}
          </span>
          <span className="text-xs text-gray-400 font-semibold">
            {subtitleTransKey}
          </span>
        </div>

        <div
          className="w-12 h-12 rounded-full bg-gray-200 flex flex-shrink-0 items-center justify-center ms-3"
          style={iconBgStyle}
        >
          {icon}
        </div>
      </div>

      <span className="text-xl font-semibold text-gray-600 mb-2">{count}</span>
      {indicator === "up" && (
        <span
          className="text-sm text-gray-400 font-semibold mb-12 inline-block"
          style={{ color: "#03D3B5" }}
        >
          <IosArrowUp width="9px" height="11px" className="inline-block" />{" "}
          {indicatorText}
          <span className="text-sm font-normal text-gray-400"> {note}</span>
        </span>
      )}
      {indicator === "down" && (
        <span
          className="text-sm text-gray-400 font-semibold mb-12 inline-block"
          style={{ color: "#FC6687" }}
        >
          <IosArrowDown width="9px" height="11px" className="inline-block" />{" "}
          {indicatorText}
          <span className="text-sm font-normal text-gray-400"> {note}</span>
        </span>
      )}
      {link && (
        <a
          className="text-xs text-purple-700 no-underline font-semibold"
          href={link}
          target="_blank"
        >
          {linkText}
        </a>
      )}
    </div>
  );
};

export default StickerCard;
