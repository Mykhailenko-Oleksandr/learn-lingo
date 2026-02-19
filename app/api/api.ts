import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{
  error: string;
  response: {
    message: string;
    validation: { body: { message: string } };
  };
}>;

export const api = axios.create({
  baseURL: "https://learn-lingo-150c6-default-rtdb.firebaseio.com/",
  withCredentials: true,
});
