import { Search } from "@assets/icons";
import Button from "@components/ui/button";
import Image from "next/image";
import cn from "classnames";
import { useState } from "react";
import { ChangeEvent } from "react";
import { useRouter } from "next/router";

interface BannerProps {
  className?: string;
}

const Banner = ({ className }: BannerProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({ pathname: "/search", query: { keyword } });
  };

  return (
    <div className={cn("relative hidden lg:flex", className)}>
      <div className="relative w-full lg:h-screen-85 contrast-75 brightness-75 -z-1">
        <Image
          src="/banner.jpg"
          layout="fill"
          objectFit="cover"
          priority
          alt="banner image"
        />
      </div>
      <div className="absolute inset-0 m-auto">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-white text-5xl xl:text-6xl font-bold">
            Cao nguyên Langbiang
          </h2>
          <p className="text-white text-lg xl:text-xl font-light mt-6">
            Cùng chúng tôi khám phá đặc sản của vùng đất cao nguyên này.
          </p>

          <div className="max-w-3xl xl:max-w-4xl w-full mt-8">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex justify-center">
                <input
                  onChange={handleChange}
                  className="p-3 xl:p-4 w-2/3 text-sm xl:text-base rounded-tl-sm rounded-bl-sm outline-none"
                  type="search"
                  placeholder="Tìm kiếm sản phẩm bạn mong muốn."
                />
                <Button className="rounded-l-none" type="submit">
                  <Search height="22" width="22" fill="#fff" />{" "}
                  <span className="ml-2 font-normal">Tìm kiếm</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
