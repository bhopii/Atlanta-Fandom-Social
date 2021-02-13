import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT);

const ViewPosts = (props) => {
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    console.log("Here in browser");

    socket.on("FromBackend", (data) => {
      console.log("In socket =============");
      setNewUser(data);
      window.setTimeout(() => {
        setNewUser("");
      }, 2000);
    });
  }, []);

  const handleTimerChange = () => {
    
  };
  return (
    // .substring(0, 5) could be useful later
    <>
      <div>
        <p>{newUser}</p>
      </div>
      {props.posts.map(
        ({ _id, category, title, imageURL, date, contentText, author }, i) => (
          <div className="row" key={i}>
            <div className="card">
              <div className="card-content white-text">
                <span className="card-title">{title}</span>
                <img src={imageURL} />
                <p>{contentText}</p>
              </div>
              <div className="card-action">
                <FontAwesomeIcon
                  onClick={() => props.addTofav(_id)}
                  icon={faHeart}
                  style={{ color: "red", height: "25px", width: "25px" }}
                >
                  Fav
                </FontAwesomeIcon>
                <div className="Author">
                  <h6>
                    Author: {author.firstName + " " + author.lastName},
                    Category: {category}, Date: {date.substring(0, 10)}
                  </h6>
                  <div />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ViewPosts;
