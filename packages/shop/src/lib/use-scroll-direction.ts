import { useEffect, useState } from "react";

export const SCROLL_UP = "up";
export const SCROLL_DOWN = "down";

export type scrollDirectionProps = {
  initialDirection?: string;
  thresholdPixels?: number;
  off?: number;
};

const useScrollDirection = ({
  initialDirection = SCROLL_DOWN,
  thresholdPixels,
  off,
}: scrollDirectionProps) => {
  const [scrollDir, setScrollDir] = useState(initialDirection);

  useEffect(() => {
    const threshold = thresholdPixels || 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    /**
     * Bind the scroll handler if `off` is set to false.
     * If `off` is set to true reset the scroll direction.
     */
    !off
      ? window.addEventListener("scroll", onScroll)
      : setScrollDir(initialDirection);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [initialDirection, thresholdPixels]);

  return scrollDir;
};

export default useScrollDirection;
