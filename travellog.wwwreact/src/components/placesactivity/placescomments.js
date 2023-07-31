import { useEffect, useState } from "react";
import "./placesactivity.css";

import PlacesCommentUser from "./placescommentuser";

function PlacesComments({ id }) {
  const [comments, setComments] = useState([]);

  useEffect(
    function () {
      fetch(`https://localhost:7209/comments?placeId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
        });
    },
    [id, setComments]
  );

  return (
    <>
      <div className="activity__comments">
        {comments.map((comment, index) => {
          console.log(comment);
          const { text, postedAt, userId } = comment;
          return (
            <div className="activity__comment" key={index}>
              <PlacesCommentUser id={userId} />
              <p>{text}</p>
              <p>{postedAt}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PlacesComments;
