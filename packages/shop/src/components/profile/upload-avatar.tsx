import Button from '@components/ui/button';
import Spinner from '@components/loader/spinner';
import { useMeQuery, useUpdateAvatarMutation } from '@generated/graphql';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';

interface IImageProps {
	id: string;
	avatar: string;
}

const UploadAvatar = ({ id, avatar }: IImageProps) => {

	const [updateAvatar] = useUpdateAvatarMutation()

	const [fileToUpload, setFileToUpload] = useState<File>([] as any);

	const [isUpload, setIsUpload] = useState(false);

	const [imageSrc, setImageSrc] = useState(avatar ?? "");

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

	const { getRootProps, getInputProps } = useDropzone({ onDrop });


	const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		await updateAvatar({
			variables: {
				id,
				file: fileToUpload,
			},
		});
		router.reload();
	};

	const handleCancel = () => {
		setIsUpload(false);
		setImageSrc(avatar ?? '/avatar-placeholder.svg');
	};

	return (
		<div className="bg-white flex flex-col items-center">
			<div className="relative border rounded-full cursor-pointer">
				<form onSubmit={handleSubmit} className="h-48 w-48">
					<div
						{...getRootProps({
							className: "edit-user h-48 w-48 object-cover rounded-full",
						})}
					>
						<input name="uploadFile" {...getInputProps()} />

						<div className="flex justify-center items-center w-full border border-dashed rounded-full border-opacity-20 h-full">
							{avatar ?
								// <Image className="rounded-full" src={imageSrc ? imageSrc : avatar} layout="fill" objectFit='cover' />
								<img className="rounded-full w-full h-full object-cover bg-cover" src={imageSrc ? imageSrc : avatar} />
								:
								// <Image className="rounded-full" src={imageSrc ? imageSrc : '/avatar-placeholder.svg'} layout="fill" objectFit='cover' />
								<img className="rounded-full w-full h-full object-cover bg-cover" src={imageSrc ? imageSrc : '/avatar-placeholder.svg'} />
							}
						</div>

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
								<span className="mr-1 text-sm">Huỷ bỏ</span>
							</Button>
							<button
								type="submit"
								className="flex items-center px-3 bg-emerald-500 hover:bg-emerald-600 rounded-md"
							>

								<span className="mr-1 text-sm">Thay đổi</span>
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