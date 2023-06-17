/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponseError {
  status: boolean;
  statusCode: number;
  errors?: IError[];
  result?: any;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IError {
  message: string;
  code: number;
  data?: any;
}

export enum UserType {
  USER = 'user',
}
export type User = {
  id: string;
  user_type: string;
};
