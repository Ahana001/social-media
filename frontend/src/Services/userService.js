import axios from "axios";

export async function getSuggestionListRequest(token) {
  return await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/user/suggestionlist`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}
