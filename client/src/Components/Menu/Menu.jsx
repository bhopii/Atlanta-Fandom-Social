import React from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";

const Menu = (props) => {
  return (
    <div>
      <div className="row">
        <div className="buttons col s4">
          <ul>
          <NavLink to="/home" className="savedPostBTN">
            <i className="material-icons">home</i>
              Home
            </NavLink>
            <NavLink to="/savedPosts" className="savedPostBTN">
            <i className="material-icons">save</i>
              Saved Posts
            </NavLink>
            <NavLink to="/post" className="savedPostBTN">
            <i className="material-icons">create</i>
              Create Post
            </NavLink>
            
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;

// <div class="list-group">
//     <a class="list-group-item" href="#"><i class="fa fa-home fa-fw" aria-hidden="true"></i>&nbsp; Home</a>
//     <a class="list-group-item" href="#"><i class="fa fa-book fa-fw" aria-hidden="true"></i>&nbsp; Library</a>
//     <a class="list-group-item" href="#"><i class="fa fa-pencil fa-fw" aria-hidden="true"></i>&nbsp; Applications</a>
//     <a class="list-group-item" href="#"><i class="fa fa-cog fa-fw" aria-hidden="true"></i>&nbsp; Settings</a>
// </div>
