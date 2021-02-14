import axios from "axios";
const getHeader = (token) => {
  return {
    headers: {
      Authorization: token,
    },
  };
};

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
    return axios.get("/api/content", getHeader(token));
  },

  addTofav: (id, token) => {
    axios.put("/api/user/" + id, {}, getHeader(token));
  },

  submitPost: (data, token) => {
    axios.post("/api/content", data, getHeader(token));
  },

  fetchMyPosts: (token) => {
    return axios.get("/api/content/user", getHeader(token));
  },

  deletePost: (id, token) => {
    return axios.delete("/api/content/" + id, getHeader(token));
  },

  fetchSavedPosts: (token) => {
    return axios.get("/api/content/savedPosts", getHeader(token));
  },

  fetchPostData: (id, token) => {
    return axios.get(`/api/content/${id}`, getHeader(token));
  },

  updatePost: (id, data, token) => {
    axios.put(`/api/content/${id}`, data, getHeader(token));
  },
};

export default API;
