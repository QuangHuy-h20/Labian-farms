import cn from 'classnames';
import { FC, LabelHTMLAttributes } from 'react';

const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
  className,
  ...rest
}) => {
  return (
    <label
      className={cn(
        'block text-body-dark text-sm leading-none mb-3',
        className
      )}
      {...rest}
    />
  );
};

export default Label;
