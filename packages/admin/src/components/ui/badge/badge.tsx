import cn from "classnames";

type BadgeProps = {
  className?: string;
  color?: string;
  textColor?: string;
  text?: string;
  textKey?: string;
};

const Badge: React.FC<BadgeProps> = (props) => {
  const {
    className,
    color: colorOverride,
    textColor: textColorOverride,
    text,
    textKey,
  } = props;

  const classes = {
    root: "px-3 py-1 rounded-full text-xs whitespace-nowrap",
    default: "bg-accent",
    text: "text-light",
  };

  return (
    <span
      className={cn(
        classes.root,
        {
          [classes.default]: !colorOverride,
          [classes.text]: !textColorOverride,
        },
        colorOverride,
        textColorOverride,
        className
      )}
    >
      {textKey ? textKey : text}
    </span>
  );
};

export default Badge;
