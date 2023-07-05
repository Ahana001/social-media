import "./CreatePostModal.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";

import { setToggleModel } from "../../Store/displaySlice";
import { AvtarWithBorder } from "../AvtarWithBorder/AvtarWithBorder";
import { addPost, editPost, setPostData } from "../../Store/postSlice";

export function CreatePostModal() {
  const { toggleModel } = useSelector((state) => state.display);
  const { authUser, authToken } = useSelector((state) => state.authentication);
  const { postData } = useSelector((state) => state.post);
  const [postInputForm, setPostInputForm] = useState({
    id: postData.id,
    content: postData.content,
    picture: postData.picture,
    displayPicture: postData.displayPicture,
  });

  useEffect(() => {
    setPostInputForm(postData);
  }, [postData]);

  const dispatch = useDispatch();
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    let base64File = await toBase64(file);
    setPostInputForm({
      ...postInputForm,
      displayPicture: base64File,
      picture: file,
    });
  };

  return (
    <div
      className="ModalPortal"
      style={{ display: toggleModel ? "flex" : "none" }}
      onClick={() => {
        dispatch(setToggleModel(false));
      }}
    >
      <div
        className="ModalPortalCloseButton"
        onClick={() => {
          dispatch(setToggleModel(false));
        }}
      >
        <RxCross1 />
      </div>
      <div className="ModalOverlay">
        <div
          className="ModalPortalContent"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="ModalPortalHeaderAndNextBtn">
            {postInputForm.id ? (
              <div className="ModalPortalHeader">Edit Post</div>
            ) : (
              <div className="ModalPortalHeader">New Post</div>
            )}
            {/* <div
              className="ModalPortalCloseButton"
              onClick={() => {
                dispatch(setToggleModel(false));
              }}
            >
              <RxCross1 />
            </div> */}
          </div>
          <div className="ModalPortalContentWrapper">
            {postInputForm.displayPicture ? (
              <div className="UploadedImageContainer">
                <RxCross1
                  className="UploadedImageCloseBtn"
                  onClick={() =>
                    setPostInputForm({
                      ...postInputForm,
                      picture: null,
                      displayPicture: null,
                    })
                  }
                />
                <img src={postInputForm.displayPicture} alt="post pic" />
              </div>
            ) : (
              <div className="ImageSelectorContainer">
                <img src="../asserts/image_gallery.png" alt="img" />
                <p>Drag photos and videos here</p>
                <label htmlFor="fileInput" className="FileInputLabel">
                  Select from computer
                  <input
                    accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                    type="file"
                    onChange={onFileChange}
                    id="fileInput"
                  />
                </label>
              </div>
            )}

            <div className="ModalPortalContentBodyAndFooterWrapper">
              <div className="ModalPortalContentBody">
                <AvtarWithBorder url={authUser.image} />
                <div className="ModalPortalContentBodyText">
                  <textarea
                    type="text"
                    placeholder="What is happening?!"
                    value={postInputForm.content}
                    onChange={(e) =>
                      setPostInputForm(() => ({
                        ...postInputForm,
                        content: e.target.value,
                      }))
                    }
                  />
                  <div className="ModalPortalContentFooter">
                    <div className="FooterActionButton">
                      <div className="EmojiSelector">
                        <BsEmojiSmile />
                      </div>
                    </div>
                    <button
                      className="PostButton"
                      disabled={postInputForm.content === "" ? true : false}
                      onClick={() => {
                        if (postInputForm.id) {
                          dispatch(
                            editPost({
                              postData: postInputForm,
                              token: authToken,
                            })
                          );
                        } else {
                          dispatch(
                            addPost({
                              postData: postInputForm,
                              token: authToken,
                            })
                          );
                        }
                        dispatch(setToggleModel(false));
                        setPostInputForm({
                          id: null,
                          content: "",
                          displayPicture: null,
                          picture: null,
                        });
                        dispatch(
                          setPostData({
                            id: null,
                            content: "",
                            displayPicture: null,
                            picture: null,
                          })
                        );
                      }}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
