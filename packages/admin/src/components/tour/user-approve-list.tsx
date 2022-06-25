import { Reference } from "@apollo/client";
import ConfirmationCard from "@components/common/confirmation-card";
import {
    useModalAction,
    useModalState,
} from "@components/ui/modal/modal.context";
import Image from "next/image";

const UserApproveList = () => {
    const { data } = useModalState();

    const handleShowUserList = () => {
        if (data?.length > 0) {
            return (
                <>
                    {data?.map(item => (
                        <div className="flex justify-between items-center" key={item.id}>
                            <Image className="rounded-md" src={item.avatar ?? "/rick-roll.webp"} width={40} height={40} objectFit="cover" />
                            <p>{item.email}</p>
                            <p>{item.phone}</p>
                        </div>
                    ))}
                </>
            )
        }
        else return <div>Chưa có khách hàng nào đăng ký</div>
    }
    return (
        <div className="p-6 bg-white m-auto min-w-xl w-full rounded-md md:rounded-xl">
            <div className="w-full h-full text-center">
                <h1 className="font-medium text-emerald-500 text-2xl mb-8">Danh sách người dùng đã đăng ký</h1>
                {handleShowUserList()}
            </div>
        </div>
    );
};

export default UserApproveList;
