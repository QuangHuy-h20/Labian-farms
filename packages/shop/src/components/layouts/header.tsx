import Link from "next/link";
import { Burger, Search, User, ArrowDown } from "@assets/icons";
import { ROUTES } from "@utils/routes";
import { useMeQuery } from "@generated/graphql";
import { useModalAction } from "@components/modal/modal.context";
import Dropdown from "@components/ui/dropdown";
import Button from "@components/ui/button";
import Image from "next/image";
// import cn from 'classnames'
// import useScrollDirection, { SCROLL_DOWN } from "@lib/use-scroll-direction";
// import usePrefersReducedMotion from "@lib/use-prefers-reduced-motion";
// import { useState, useEffect } from "react";
// import { StyledHeader } from "@assets/css/styled";

// type IHeaderProps = {
//   isHome: boolean
// }

const Header = () => {
  const { data: meData, loading: meLoading } = useMeQuery();
  const { openModal } = useModalAction();


  let body: any;

  if (meLoading) body = null
  else if (!meData?.me) body = <Button size="small" variant="normal" onClick={() => openModal('LOGIN')}>
    <span>Đăng nhập</span></Button>

  else body = (
    <Dropdown subItems={ROUTES.account}>
      <div className="flex flex-row ml-4 border-0! items-center">
        <div className="flex flex-col text-right text-sm text-gray-500">
          <p className="font-light">Xin chào,</p>
          <div className="flex flex-row items-center">
            <span className="font-medium mr-1">{meData.me.fullName !== "" ? meData.me.fullName : meData.me.email}</span>
            <ArrowDown />
          </div>
        </div>
        <div className="h-12 w-12 flex justify-center items-center border rounded-full ml-2">
          {meData?.me?.avatar ? <img className="rounded-full w-12 h-12 bg-contain" src={meData?.me?.avatar} /> : <User />}
        </div>
      </div>
    </Dropdown>
  )

  return (
    <header className="flex items-center justify-between h-24 px-6 w-full bg-white" >
      <div className="flex items-center justify-between w-full font-medium">
        <div className="lg:hidden"><Burger /></div>

        <div className="flex items-center">
          <Link href="/">
            <a className="text-2xl lg:text-3xl text-emerald-500">Labian Farms</a>
          </Link>
        </div>


        <ul className="hidden flex-row items-center border-0 lg:flex">
          {ROUTES.menu.map(item => (
            <li className="px-5" key={item.name}>
              <Link href={item.route}>
                <a className="text-gray-500 text-sm font-semibold hover:text-emerald-400 duration-300">{item.name}</a>
              </Link>
            </li>
          ))}
          <div>{body}</div>
        </ul>
        <div className="lg:hidden"><Search fill="#292D32" height="22" width="22" /></div>
      </div>

    </header>

  )
};

export default Header;
