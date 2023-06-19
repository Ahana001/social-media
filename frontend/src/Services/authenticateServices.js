import axios from "axios";

export async function loginRequest(username, password) {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/user/auth/login`,
    {
      username,
      password,
    }
  );
}
export async function signupRequest(username, password, city) {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/user/auth/register`,
    {
      username,
      password,
      city,
    }
  );
}
