import axios from "axios";
export async function getAllPostRequest(token) {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/post`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function addPostRequest(postData, token) {
  const formData = new FormData();
  formData.append("picture", postData.picture);
  formData.append("content", postData.content);

  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/post`,
    formData,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}
export async function deletePostRequest(postId, token) {
  return await axios.delete(
    `${process.env.REACT_APP_API_BASE_URL}/post/${postId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function editPostRequest(postData, token) {
  const formData = new FormData();
  formData.append("picture", postData.picture);
  formData.append("content", postData.content);

  return await axios.put(
    `${process.env.REACT_APP_API_BASE_URL}/post/${postData.id}`,
    formData,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}
export async function likePostRequest(postId, token) {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/post/like/${postId}`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}
export async function dislikePostRequest(postId, token) {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/post/dislike/${postId}`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}
