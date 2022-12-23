import { createUpdateUserInput } from "@/schemas/user.schema";
import { IGenericResponse, IUserResponse, IUsersResponse } from "@/types/user";
import { axiosInstance } from "@/utils/axios";

export const getAllUsers = async () => {
  const response = await axiosInstance.get<IUsersResponse>("users");
  return response.data;
};

export const createUpdateUser = async (userInput: createUpdateUserInput) => {
  const toUpdate = !!userInput._id;
  if (toUpdate) {
    const response = await axiosInstance.put<IGenericResponse>(
      `users/${userInput._id}`,
      userInput
    );
    return response.data;
  }

  const response = await axiosInstance.post<IGenericResponse>(
    "users",
    userInput
  );
  return response.data;
};

export const deleteUser = async (_id: string) => {
  const response = await axiosInstance.delete<IGenericResponse>(`users/${_id}`);
  return response.data;
};

export const sendUserDetails = async (userDetail: IUserResponse) => {
  const response = await axiosInstance.post<IGenericResponse>(
    "sendEmail",
    userDetail
  );
  return response.data;
};
