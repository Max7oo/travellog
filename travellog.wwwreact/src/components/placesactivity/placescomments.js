import { useEffect, useState } from "react";
import "./placesactivity.css";

import PlacesComment from "./placescomment";
import { Link } from "react-router-dom";

import like from "../../images/like.svg";
import liked from "../../images/liked.svg";
import chat from "../../images/chat.svg";
import chatactive from "../../images/chatactive.svg";
import send from "../../images/send.svg";

const initialState = {
  text: "",
  postedAt: null,
  placeId: null,
};

function PlacesComments({ id }) {
  const [formData, setFormData] = useState(initialState);
  const [comments, setComments] = useState([]);
  const userName = localStorage.getItem("UserName");
  const [flag, setFlag] = useState(false);
  const [lessThanThree, setLessThanThree] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [emptyComment, setEmptyComment] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(
    function () {
      fetch(`${process.env.REACT_APP_API_LINK}/comments?placeId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 3) {
            setLessThanThree(true);
          }
          setComments(data);
        });
    },
    [id, setComments]
  );

  // const checkLiked = async (id) => {
  //   await fetch(
  //     `https://localhost:7209/like/${userName}/{id}?placeid=${id}`
  //   ).then((res) => {
  //     if (res.ok) {
  //       setIsLiked(true);
  //     }
  //   });
  // };

  const likePlace = async (id) => {
    await fetch(
      `${process.env.REACT_APP_API_LINK}/like/${userName}/{id}?placeid=${id}`
    ).then(setIsLiked(!isLiked));
  };

  const chatPlace = () => {
    setShowChat(!showChat);
  };

  // const sendPlace = () => {};

  const loadMore = () => {
    setFlag(!flag);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (id) => {
    if (formData.text !== "") {
      setIsButtonDisabled(true);
      formData.postedAt = Date.now().toString();
      formData.placeId = id;
      setEmptyComment(false);
      fetch(`${process.env.REACT_APP_API_LINK}/${userName}/add/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setComments([...comments, data]);
        });
      formData.text = "";
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 5000);
    } else {
      setEmptyComment(true);
    }
  };

  return (
    <>
      <div className="activity__place__options">
        <Link onClick={() => likePlace(id)}>
          {isLiked ? (
            <img src={liked} alt="liked" />
          ) : (
            <img src={like} alt="like" />
          )}
        </Link>
        <Link onClick={() => chatPlace()}>
          {showChat ? (
            <img src={chatactive} alt="chatactive" />
          ) : (
            <img src={chat} alt="chat" />
          )}
        </Link>
        <Link>
          <img src={send} alt="send" />
        </Link>
      </div>
      {showChat ? (
        <div className="activity__comments">
          {comments.map((comment, index) => {
            if (index < 3) {
              const { text, postedAt, userId } = comment;
              return (
                <div className="activity__comment" key={index}>
                  <PlacesComment id={userId} postedAt={postedAt} text={text} />
                </div>
              );
            } else if (flag === true) {
              if (index >= 3) {
                const { text, postedAt, userId } = comment;
                return (
                  <div className="activity__comment" key={index}>
                    <PlacesComment
                      id={userId}
                      postedAt={postedAt}
                      text={text}
                    />
                  </div>
                );
              }
            }
          })}
          {lessThanThree ? (
            <>
              {flag ? (
                <Link
                  className="activity__comment__more"
                  onClick={() => loadMore()}
                >
                  Show less
                </Link>
              ) : (
                <Link
                  className="activity__comment__more"
                  onClick={() => loadMore()}
                >
                  Show more
                </Link>
              )}
            </>
          ) : (
            <></>
          )}

          <input
            id="text"
            name="text"
            type="textarea"
            placeholder="Add a comment..."
            required
            onChange={handleChange}
            value={formData.text}
          />
          {emptyComment && (
            <p className="red">You cannot post an empty comment.</p>
          )}

          {isButtonDisabled ? (
            <>
              <div className="spinner-container">
                <div className="loading-spinner-mini"></div>
              </div>
            </>
          ) : (
            <>
              <div className="activity__comment__button">
                <button className="button" onClick={() => handleSubmit(id)}>
                  Comment
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default PlacesComments;
