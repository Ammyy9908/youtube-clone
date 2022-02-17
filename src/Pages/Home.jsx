import React from "react";
import { connect } from "react-redux";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "./Home.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
TimeAgo.addDefaultLocale(en);

function MyVideoComponent({ cover, time, title, author, id }) {
  const history = useHistory();

  const handleWatchVideo = () => {
    history.push(`/watch?v=${id}`);
  };
  return (
    <div className="myvideo-card" onClick={handleWatchVideo}>
      <div className="video-cover">
        <img src={cover} alt="video-cover" />
      </div>
      <h5>{title}</h5>
      {/* <div className="myvideo-card-footer">
        
        <p>
          <div className="video-card-meta-left">
          
            <span className="timestamp">
              <ReactTimeAgo date={time} locale="en-US" />
            </span>
          </div>{" "}
          <span className="video-author">{author}</span>
        </p>
      </div> */}
    </div>
  );
}

function RecommendationCard({ title, time, author, cover }) {
  return (
    <div className="recommendation-card">
      <div className="recommendation-card-cover">
        <img src={cover} alt="recommendation-card-cover" />
      </div>

      <div className="recommendation-footer">
        <h4>{title}</h4>
        <p className="card-meta">
          <div className="footer-left">
            <span className="views">34k views</span>{" "}
            <span className="time">{time} ago</span>
          </div>
          <div className="footer-right">
            <span className="auhor">{author}</span>
          </div>
        </p>
      </div>
    </div>
  );
}
function Home({ randomChannel }) {
  const [dark, setDark] = React.useState(false);
  console.log(randomChannel);
  return (
    <div className="home">
      <Header setDark={setDark} dark={dark} />
      <div
        className={`ripple ${dark ? "ripple_enable" : "ripple_disable"}`}
      ></div>
      <div className="layout">
        <Sidebar />
        <div className="home-body">
          {randomChannel && (
            <div className="video-for-you-section-component">
              <div className="section-header">
                <div className="section-header-left">
                  <Link to={`/channel/${randomChannel.id}`}>
                    <div className="section-header-avatar">
                      <img src={randomChannel.picture} alt="" />
                    </div>
                  </Link>
                  <h3>{randomChannel.title}</h3>
                </div>
              </div>

              <div className="your-videos">
                {randomChannel &&
                  randomChannel.videos.slice(0, 6).map((video, index) => {
                    return (
                      <MyVideoComponent
                        cover={video.snippet.thumbnails.medium.url}
                        key={index}
                        time={video.snippet.publishedAt}
                        title={video.snippet.title}
                        author={randomChannel.title}
                        id={video.id.videoId}
                      />
                    );
                  })}
              </div>
            </div>
          )}
          <div className="recommendation-section">
            <div className="recommendation-header">
              <h3>Recommendation</h3>
            </div>
            <div className="recommendations">
              <RecommendationCard
                title="Dude You Re Getting A Telescope"
                cover="/bigcover1.png"
                time="5 months"
                author="Gussie French"
              />
              <RecommendationCard
                title="Dude You Re Getting A Telescope"
                cover="/bigcover2.png"
                time="5 months"
                author="Gussie French"
              />
              <RecommendationCard
                title="Dude You Re Getting A Telescope"
                cover="/bigcover3.png"
                time="5 months"
                author="Gussie French"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  randomChannel: state.appReducer.randomChannel,
});
export default connect(mapStateToProps, null)(Home);
