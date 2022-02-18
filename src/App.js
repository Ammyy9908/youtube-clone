import "./App.css";
import Channel from "./Pages/Channel";
// import "./debug.css";
import React from "react";
import Home from "./Pages/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import getUser from "./utils/getUser";
import { connect } from "react-redux";
import getSubscriptions from "./utils/getSubscriptions";
import getChannelVideos from "./utils/getChannelVideos";
import VideoDetail from "./Pages/VideoDetail";
import ExplorePage from "./Pages/ExplorePage";
import get_popular_videos from "./utils/getPopularVideos";

function App({
  setUser,
  setSubscriptions,
  setRandomChannel,
  setPopularVideos,
}) {
  React.useEffect(() => {
    if (Cookies.get("token")) {
      getUser()
        .then((user) => {
          console.log(user);
          setUser(user);
        })
        .catch((e) => {
          console.log(e);
        });

      getSubscriptions()
        .then((subscriptions) => {
          setSubscriptions(subscriptions);
          return subscriptions;
        })
        .then((subscriptions) => {
          let subscription =
            subscriptions[
              Math.floor(Math.random() * (0, subscriptions.length))
            ];

          getChannelVideos(subscription.snippet.resourceId.channelId)
            .then((data) => {
              console.log(data);
              const videos = data;
              const { title, thumbnails } = subscription.snippet;
              const { channelId } = subscription.snippet.resourceId;
              const resObj = {
                title: title,
                id: channelId,
                picture: thumbnails.default.url,
                videos: videos,
              };
              setRandomChannel(resObj);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });

      // get popular videos

      get_popular_videos()
        .then((videos) => {
          console.log("Popular Videos", videos);
          setPopularVideos(videos);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/explore">
            <ExplorePage />
          </Route>

          <Route
            exact
            path="/channel/:cid"
            render={(props) => {
              const cid = props.match.params.cid;
              return <Channel cid={cid && cid} />;
            }}
          />

          <Route
            exact
            path="/watch"
            render={(props) => {
              return <VideoDetail />;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({ type: "SET_USER", user }),
  setPopularVideos: (popular_videos) =>
    dispatch({ type: "SET_POPULAR_VIDEOS", popular_videos }),
  setSubscriptions: (subscriptions) =>
    dispatch({ type: "SET_SUBSCRIPTIONS", subscriptions }),
  setRandomChannel: (randomChannel) =>
    dispatch({ type: "SET_RANDOM_CHANNEL", randomChannel }),
});
export default connect(null, mapDispatchToProps)(App);
