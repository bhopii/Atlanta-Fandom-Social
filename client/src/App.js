import  {useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Home from "./Containers/Home/Home";
import Login from "./Containers/Login/Login";
import Signup from "./Containers/Signup/Signup";
import Profile from "./Containers/Profile/Profile";
import Post from "./Containers/Post/Post";
import EditPost from "./Components/EditPost/EditPost";
import SavedPosts from "./Containers/SavedPosts/SavedPosts";
import Axios from "axios";
import { initiateSocket, disconnectSocket, sendMessage} from "./socket/socket";

// these are for Bonus when we get MVP working
// import WelcomeTopics from "./Containers/WelcomeTopics/WelcomeTopics";
// import WelcomeProfile from "./Containers/WelcomeProfile/WelcomeProfile";

library.add(fab, faCheckSquare, faCoffee);

function App() {
  const [token, setToken] = useState(localStorage.getItem("loginKey"));
  const [fullName, setFullName] = useState("Welcome !!");

  useEffect(()=> {
    if(token && fullName) {
      initiateSocket(fullName);
    }
    


    return () => {
      disconnectSocket();
    }
  }, [fullName]);

  useEffect(() => {
    //Call user api to get User Name and set the same to state
    if (token) {
      Axios.get("/api/user", {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => setFullName(res.data.fullName))
        .catch((err) => console.log(err.response));
    }
  }, []);

  if (token === null) {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path={["/", "/signup"]}>
              <Signup setToken={setToken} />
            </Route>
            <Route exact path="/login">
              <Login setToken={setToken} />
            </Route>
            <Route
              exact
              path={["/post", "/home", "/profile", "/post/:id", "/savedPosts"]}
            >
              <Login setToken={setToken} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={["/", "/signup"]}>
            <Signup setToken={setToken} />
          </Route>
          <Route exact path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route exact path="/post">
            <Post token={token} fullName={fullName} changePosts={sendMessage}/>
          </Route>
          <Route exact path="/home">
            <Home token={token} fullName={fullName}/>
          </Route>
          <Route exact path="/profile">
            <Profile token={token} fullName={fullName}/>
          </Route>
          <Route exact path="/post/:id">
            <EditPost token={token} fullName={fullName} changePosts={sendMessage}/>
          </Route>
          <Route exact path="/savedPosts">
            <SavedPosts token={token} fullName={fullName}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
