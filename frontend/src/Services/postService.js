import axios from "axios";

export async function getAllUserPostRequest(token) {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/post`, {
    headers: {
      authorization: token,
    },
  });
}
