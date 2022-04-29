import { ProfileInput, useMeQuery, useUpdateProfileMutation } from "@generated/graphql"
import ProfileForm from './profile-form'
import { toast } from 'react-toastify';
import { constants as c } from '@constants/index'
const ProfileInformation = () => {

	const { data: meData } = useMeQuery()
	const [updateProfile, {loading: updating}] = useUpdateProfileMutation({
		onCompleted: (data) => {
			if (data?.updateProfile?.success) {
				toast.success(c.SUCCESS_UPDATE_PROFILE);
			}
		},
		onError: (_err) => {
			toast.error(c.FAIL_UPDATE_PROFILE);
		},
	})

	const onSubmit = async (values: ProfileInput) => {
		if (!meData) return false
		await updateProfile({
			variables: { profileInput: values }
		})
	}

	return <></>
}

export default ProfileInformation