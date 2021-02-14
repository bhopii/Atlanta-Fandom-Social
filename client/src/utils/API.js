import axios from "axios";

const API = {
  login: (username, password) => {
    return axios.post("/api/login", { username, password });
  },

  signup: (data) => {
    return axios.post("/api/signUp", data);
  },

  filterHomeData: (posts, filter) => {
    console.log(posts);
    let resultAfterFilter = posts.filter(
      (post) =>
        post.category[0].toLowerCase().indexOf(filter) > -1 ||
        post.title.toLowerCase().indexOf(filter) > -1 ||
        post.contentText.toLowerCase().indexOf(filter) > -1 ||
        post.author.firstName.toLowerCase().indexOf(filter) > -1 ||
        post.author.lastName.toLowerCase().indexOf(filter) > -1
    );
    return resultAfterFilter;
  },

  filterPostData: (posts, filter) => {
    console.log(posts);
    let resultAfterFilter = posts.filter(
      (post) =>
        post.category[0].toLowerCase().indexOf(filter) > -1 ||
        post.title.toLowerCase().indexOf(filter) > -1 ||
        post.contentText.toLowerCase().indexOf(filter) > -1
    );
    return resultAfterFilter;
  },

  fetchAllPosts: (token) => {
    return axios.get("/api/content", {
      headers: {
        Authorization: token,
      },
    });
  },

  addTofav: (id, token) => {
    axios.put("/api/user/" + id, {}, { headers: { Authorization: token } });
  },

  submitPost: (data, token) => {
    axios.post("/api/content", data, {
      headers: {
        Authorization: token,
      },
    });
  },

  fetchMyPosts: (token) => {
    return axios.get("/api/content/user", {
      headers: {
        Authorization: token,
      },
    });
  },

  deletePost: (id, token) => {
    return axios.delete("/api/content/" + id, {
      headers: {
        Authorization: token,
      },
    });
  },
};

export default API;
