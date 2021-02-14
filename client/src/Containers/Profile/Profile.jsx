import { React, useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import Menu from "../../Components/Menu/Menu";

import { Redirect } from "react-router-dom";
import ViewMyPosts from "../../Components/ViewPosts/ViewMyPosts.jsx";

import "./Profile.css";
import API from "../../utils/API";

const Profile = (props) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");

  // This function is called when user enters something in the search box and
  //it gets stored to filter state variable
  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  };
  // write a function mentioning where all you want to set the filter
  const filterData = (posts) => {
    console.log(posts);
    let resultAfterFilter = posts.filter(
      (post) =>
        post.category[0].toLowerCase().indexOf(filter) > -1 ||
        post.title.toLowerCase().indexOf(filter) > -1 ||
        post.contentText.toLowerCase().indexOf(filter) > -1 
    );
    return resultAfterFilter;
  };  


  const getData = async () => {
    const response = await API.fetchMyPosts(props.token);
    setPosts(response.data);
  };

  const handleDelete = async (_id) => {
    await API.deletePost(_id, props.token);
    getData();
  };

  useEffect(() => {
    // api call to get all posts of that user
    getData();
  }, []);

  if (props.token === null) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="main">
      <Navbar handleChange={handleChange} />
      <div className="row">

      <div className="col s4">
          <Menu token={props.token} />
        </div>

        <div className="col s5">
          <ViewMyPosts
            token={props.token}
            posts={filterData(posts)}
            handleDelete={handleDelete}
          />
        </div>

      </div>
    </div>
  );
};

export default Profile;
