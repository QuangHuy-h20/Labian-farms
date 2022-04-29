import React from "react";
import Link from "@components/ui/Link";
import AuthorizedMenu from "./authorized-menu";
import { ROUTES } from "@utils/routes";
import LinkButton from "@components/ui/link-button";
import { useMeQuery } from "@generated/graphql";

const Navbar = () => {
  const { data } = useMeQuery();
  return (
    <header className="bg-white shadow fixed w-full z-50 py-4 px-10">
      <div className="hidden md:flex justify-between">
        <Link href="/" className="text-emerald-500 text-2xl">
          Labian Farms
        </Link>

        <div className="flex items-center">
          {data?.me?.roleId === "farmer" && (
            <LinkButton
              href={ROUTES.CREATE_FARM}
              className="mr-10"
              size="small"
            >
              Tạo nông trại
            </LinkButton>
          )}

          <AuthorizedMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
