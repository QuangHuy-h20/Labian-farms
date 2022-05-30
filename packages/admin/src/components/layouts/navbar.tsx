import Link from "@components/ui/link";
import React from "react";
import AuthorizedMenu from "./authorized-menu";

const Navbar = () => {
  return (
    <header className="bg-white shadow fixed w-full z-50 py-4 px-10">
      <div className="hidden md:flex justify-between">
        <Link href="/" className="text-emerald-500 text-2xl">
          Labian Farms
        </Link>

        <div className="flex items-center">
          <AuthorizedMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
