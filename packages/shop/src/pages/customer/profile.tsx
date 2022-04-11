import { getLayout as getSiteLayout } from '@components/layouts/site-layout'
import { ReactElement } from 'react'
import ProfileForm from '@components/profile/profile-form'
import { useMeQuery } from '@generated/graphql'
import Spinner from '@components/loader/spinner'

const Profile = () => {
  const { data: meData, loading: meLoading } = useMeQuery()

  return (
    <>
      {meLoading ? <div className='flex items-center h-screen'>
        <Spinner size='large' />
      </div> : <>
        <ProfileForm />
      </>
      }
    </>
  )
}

const getLayout = (page: ReactElement) =>
  getSiteLayout(
    <div className="bg-gray-100 flex flex-col lg:flex-row items-start h-full w-full mx-auto">
      <div className="flex justify-center bg-white w-full px-1 pb-1 overflow-hidden border rounded">
        {page}
      </div>
    </div>

  );
Profile.getLayout = getLayout;

export default Profile