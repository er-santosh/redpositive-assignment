export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  phone: string;
  hobbies: string;
}

export type IUsersResponse = IUserResponse[];

export interface IGenericResponse {
  status: number;
  message: string;
}
