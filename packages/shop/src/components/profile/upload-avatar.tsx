import { User } from '@assets/icons';
import Button from '@components/ui/button';
import { useMeQuery, useUpdateAvatarMutation } from '@generated/graphql';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';

const UploadAvatar = () => {

	const [updateAvatar] = useUpdateAvatarMutation()

	const { data: meData, loading: meLoading } = useMeQuery();

	const [fileToUpload, setFileToUpload] = useState<File>([] as any);

	const [isUpload, setIsUpload] = useState(false);

	const [imageSrc, setImageSrc] = useState("");

	const router = useRouter();

	const readFile = (file: File) => {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.addEventListener("load", () => resolve(reader.result), false);
			reader.readAsDataURL(file);
		});
	};

	const onFileChange = async (e: any) => {
		const file = e;
		let imageUrl: any = await readFile(file);
		setImageSrc(imageUrl);
	};

	const onDrop = useCallback(([file]) => {
		setFileToUpload(file);
		setIsUpload(true);
		onFileChange(file);
	}, []);

	const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		await updateAvatar({
			variables: {
				id: meData!.me!.id as string,
				file: fileToUpload,
			},
		});
		router.reload();
	};

	const handleCancel = () => {
		setIsUpload(false);
		setImageSrc(meData?.me?.avatar as string);
	};

	const { getRootProps, getInputProps } = useDropzone({ onDrop });
	return (
		<div className="bg-white flex flex-col items-center">
			<div className="relative border rounded-full h-48 w-48 cursor-pointer">
				<form onSubmit={handleSubmit} className="w-full h-full">
					<div
						{...getRootProps({
							className: "edit-user w-full h-full object-cover rounded-full",
						})}
					>
						<input name="uploadFile" {...getInputProps()} />
						{!meData?.me?.avatar ? (
							<div className="flex justify-center items-center w-full border border-dashed rounded-full border-opacity-20 h-full">
								<h1 className="text-4xl">
									<User />
								</h1>
							</div>
						) : (
							<img
								className="w-full h-full object-cover rounded-full"
								src={imageSrc === "" ? meData?.me?.avatar : imageSrc}
								alt=""
							/>
						)}
					</div>
					{isUpload ? (
						<div className="flex justify-between w-full my-3 text-white">
							<Button
								type='button'
								size='medium'
								variant='outline'
								onClick={handleCancel}
								className="flex items-center"
							>
								<span className="mr-1 text-sm">Cancel</span>
							</Button>
							<button
								type="submit"
								className="flex items-center p-2 bg-green-200 hover:bg-green-400 rounded-md bg-opacity-80"
							>

								<span className="mr-1 text-sm">Change</span>
							</button>
						</div>
					) : (
						""
					)}
				</form>
			</div>
		</div>
	)
}

export default UploadAvatar