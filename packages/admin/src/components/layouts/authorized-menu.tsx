import cn from "classnames";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Avatar from "@components/user/avatar";
import Link from "@components/ui/Link";
import { siteSettings } from "@settings/site.settings";
import { useMeQuery } from "@generated/graphql";

export default function AuthorizedMenu() {
  const { data } = useMeQuery();


  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center focus:outline-none">
        <Avatar
          src={data?.me.avatar ? data?.me.avatar : siteSettings?.avatar?.placeholder}
          alt="avatar"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className="absolute right-0 w-48 mt-1 origin-top-right bg-white rounded shadow-md focus:outline-none"
        >
          <Menu.Item key={data?.me?.email}>
            <li
              className="w-full flex flex-col space-y-1 bg-[#00b791]
             text-white text-sm rounded-t px-4 py-3"
            >
              <span className="font-semibold capitalize">
                {data?.me?.email?.split("@")}
              </span>
              <span className="text-xs">{data?.me?.email}</span>
            </li>
          </Menu.Item>

          {siteSettings.authorizedLinks.map(({ href, labelTransKey }) => (
            <Menu.Item key={`${href}${labelTransKey}`}>
              {({ active }) => (
                <li className="border-b border-gray-100 cursor-pointer last:border-0">
                  <Link
                    href={href}
                    className={cn(
                      "block px-4 py-3 text-sm capitalize font-medium transition duration-200 hover:text-emerald-500",
                      active ? "text-emerald-500" : "text-gray-400"
                    )}
                  >
                    {labelTransKey}
                  </Link>
                </li>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
