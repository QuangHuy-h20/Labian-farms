import React, { FC } from 'react';

type CartProps = {
    width?: number;
    height?: number;
    className?: string;
};

const Clock: FC<CartProps> = ({ width, height, className }) => {
    return (
        <svg width={width}
            height={height}
            className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48583 2 2 6.48583 2 12C2 17.5142 6.48583 22 12 22C17.5142 22 22 17.5142 22 12C22 6.48583 17.5142 2 12 2ZM17.8333 12C17.8333 12.4602 17.4602 12.8333 17 12.8333H12.5C11.7636 12.8333 11.1667 12.2364 11.1667 11.5V7C11.1667 6.53976 11.5398 6.16667 12 6.16667C12.4602 6.16667 12.8333 6.53976 12.8333 7V11.1667H17C17.4602 11.1667 17.8333 11.5398 17.8333 12Z" fill="#C4C4CF" />
        </svg>

    );
};

export default Clock;
