import React, { ReactElement } from 'react'
import Sidebar from '@components/layouts/sidebar'
import { ILayoutProps } from './layout';

const SiteLayout = ({ children }: ILayoutProps) => {
  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row items-start w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14">
      <Sidebar className="flex-shrink-0 hidden lg:block lg:w-80" />
      {children}
    </div>
  )
}

export const getLayout = (page: ReactElement) => (
  <SiteLayout>{page}</SiteLayout>
);

export default SiteLayout