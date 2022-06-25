import Button from "@components/ui/button";
import { useUpdateFarmCoverMutation } from "@generated/graphql";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface IProps {
    id: string;
    image: string;
}

const UploadFarmCover = ({ id, image }: IProps) => {
    const [updateCover] = useUpdateFarmCoverMutation();

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
        await updateCover({
            variables: {
                id,
                file: fileToUpload,
            },
        });
        router.reload();
    };


    const handleCancel = () => {
        setIsUpload(false);
        setImageSrc(image);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (

        <form onSubmit={handleSubmit} className="relative w-full h-full">
            <div className="h-full" {...getRootProps({})}>
                <input name="uploadFile" {...getInputProps()} />
                {/* <Image
                    src={imageSrc === "" ? image ?? '/product-placeholder-borderless.svg' : imageSrc}
                    layout="fill"
                    objectFit="cover"
                /> */}
                <img
                    sizes="100vh"
                    src={imageSrc === "" ? image ?? '/product-placeholder-borderless.svg' : imageSrc}
                    className="object-cover bg-contain w-full h-full"
                />
            </div>
            {isUpload && (
                <div className="absolute top-0 left-2">
                    <div className="flex justify-between w-full my-3 text-white">
                        <Button
                            type='button'
                            size='small'
                            variant='outline'
                            onClick={handleCancel}
                            className="flex items-center mr-2"
                        >
                            <span className="mr-1 text-sm">Huỷ bỏ</span>
                        </Button>
                        <Button
                            size="small"
                            type="submit"
                            className="flex items-center px-3 bg-emerald-500 hover:bg-emerald-600 rounded-md"
                        >

                            <span className="mr-1 text-sm">Thay đổi</span>
                        </Button>
                    </div>
                </div>

            )}
        </form>

    );
};

export default UploadFarmCover;
