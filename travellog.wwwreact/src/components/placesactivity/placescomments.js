import { useEffect, useState } from "react";
import "./placesactivity.css";

import PlacesComment from "./placescomment";
import { Link } from "react-router-dom";

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

  useEffect(
    function () {
      fetch(`https://localhost:7209/comments?placeId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length >= 3) {
            setLessThanThree(true);
          }
          setComments(data);
        });
    },
    [id, setComments]
  );

  const loadMore = () => {
    setFlag(!flag);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (id) => {
    formData.postedAt = Date.now().toString();
    formData.placeId = id;
    fetch(`https://localhost:7209/${userName}/add/comment`, {
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
  };

  return (
    <>
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
                  <PlacesComment id={userId} postedAt={postedAt} text={text} />
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

        <div className="activity__comment__button">
          <button className="button blue" onClick={() => handleSubmit(id)}>
            Comment
          </button>
        </div>
      </div>
    </>
  );
}

export default PlacesComments;
