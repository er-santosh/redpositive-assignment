import { deleteUser, getAllUsers, sendUserDetails } from "@/api/user.api";
import UserCreateUpdateModal from "@/components/screens/users/user-create-update-modal";
import ConfirmModal from "@/components/ui/modal/confirm-modal";
import { IUserResponse } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { AiFillDelete, AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const UsersTable = () => {
  const [toDeleteUser, setToDeleteUser] = useState<IUserResponse | null>(null);
  const [selectedRow, setSelectedRow] = useState<IUserResponse | null>(null);
  const { isLoading, data: users, refetch } = useQuery(["users"], getAllUsers);
  const { mutate } = useMutation(deleteUser, {
    onSuccess: (success) => {
      setToDeleteUser(null);
      setSelectedRow(null);
      refetch();
      toast.success(success.message);
    },
    onError: (error) => {
      toast.error("Something went wrong");
    },
  });
  const { mutate: send, isLoading: isSending } = useMutation(sendUserDetails, {
    onSuccess: (success) => {
      toast.success(success.message);
    },
    onError: (error) => {
      toast.error("Something went wrong");
    },
  });
  if (isLoading) return <p>Loading....</p>;

  const handleRowSelect = (
    e: ChangeEvent<HTMLInputElement>,
    rowValue: IUserResponse
  ) => {
    const isSelected = e.target.checked;
    if (isSelected) {
      setSelectedRow(rowValue);
    } else {
      setSelectedRow(null);
    }
  };

  const sendEmail = () => {
    send(selectedRow as IUserResponse);
  };

  const deleteUserNow = () => {
    if (toDeleteUser) {
      mutate(toDeleteUser._id);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl py-6 font-bold">USERS</h1>
      <div className="flex justify-between w-10/12 my-6">
        <UserCreateUpdateModal onSuccess={refetch} />
        <div>
          <button
            onClick={sendEmail}
            className={twMerge(
              "btn flex items-center space-x-4",
              !!!selectedRow || isSending ? "btn-disabled" : ""
            )}
            disabled={!!!selectedRow || isSending}
          >
            <AiOutlineMail />
            <span>{isSending ? "Sending" : "Send Email"}</span>
          </button>
        </div>
      </div>
      <table className="w-10/12 text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6"></th>
            <th scope="col" className="py-3 px-6">
              ID
            </th>
            <th scope="col" className="py-3 px-6">
              NAME
            </th>
            <th scope="col" className="py-3 px-6">
              EMAIL
            </th>
            <th scope="col" className="py-3 px-6">
              PHONE
            </th>
            <th scope="col" className="py-3 px-6">
              HOBBIES
            </th>
            <th scope="col" className="py-3 px-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id} className="bg-white border-b ">
              <td className="py-4 px-6">
                <input
                  disabled={!!selectedRow && selectedRow?._id !== user._id}
                  type="checkbox"
                  className={twMerge(
                    !!selectedRow && selectedRow?._id !== user._id
                      ? "border-gray-300 hover:cursor-not-allowed"
                      : ""
                  )}
                  onChange={(e) => handleRowSelect(e, user)}
                />
              </td>
              <td className="py-4 px-6">{user._id}</td>
              <td scope="row" className="py-4 px-6 font-medium">
                {user.name}
              </td>
              <td className="py-4 px-6">{user.email}</td>
              <td className="py-4 px-6">{user.phone}</td>
              <td className="py-4 px-6">{user.hobbies}</td>
              <td className="py-4 px-6 flex space-x-5">
                <UserCreateUpdateModal
                  editMode
                  editingUser={user}
                  onSuccess={refetch}
                />
                <ConfirmModal
                  trigger={<AiFillDelete size={25} color="red" />}
                  selectItem={() => setToDeleteUser(user)}
                  proceed={deleteUserNow}
                >
                  <p className="text-lg">
                    Are you sure you want to delete{" "}
                    <span className=" underline font-bold">
                      {" "}
                      {toDeleteUser?.name}
                    </span>{" "}
                    ?
                  </p>
                </ConfirmModal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
