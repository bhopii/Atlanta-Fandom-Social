import { React, useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Redirect } from "react-router-dom";
import Menu from "../../Components/Menu/Menu";
import "./SavedPosts.css";
import ViewSavedPosts from "../../Components/ViewPosts/ViewSavedPosts";
import API from "../../utils/API";

const SavedPosts = (props) => {
  const [savedPosts, setSavedPosts] = useState([]);
  useEffect(async () => {
    const response = await API.fetchSavedPosts(props.token);
    setSavedPosts(response.data);
  }, []);
  if (props.token === null) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Navbar />
      <div className="row">
        <div className="col s4">
          <Menu token={props.token} />
        </div>
        <div className="col s5">
          <ViewSavedPosts posts={savedPosts} />
        </div>
      </div>
    </div>
  );
};

export default SavedPosts;
