import React, { useEffect, useState } from "react";
import "../../Components/Cardpost/Cardpost.css";
import Menu from "../../Components/Menu/Menu";
import ViewPosts from "../../Components/ViewPosts/ViewPosts";
import Navbar from "../../Components/Navbar/Navbar";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import "./Home.css"

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");


  // This function is called when user enters something in the search box and
  //it gets stored to filter state variable
  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  };

  useEffect( async () => {
    try {
      const response = await API.fetchAllPosts(props.token);
      setPosts(response.data);
    } catch(err) {
      console.error(err);
    }
  }, []);

  const addTofav = async (id) => {
    API.addTofav(id, props.token);
  }

  if (props.token === null) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Navbar handleChange={handleChange} />
      <div className="row">
        {/* 6-columns (one-half) */}
        <div className="col s4">
          <Menu token={props.token} />
        </div>
        {/* 6-columns (one-half) */}
        <div className="col s5">
          <ViewPosts token={props.token} posts={API.filterHomeData(posts, filter)} addTofav={addTofav} />
        </div>
      </div>
    </div>
  );
};

export default Home;
