import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import getChannel from "../utils/getChannel";
import "./Channel.css";

function RecommendedChannel({ title, user }) {
  return (
    <div className="recommended-channel">
      <div className="channel-avatar">
        <img src={user} alt="channel-avatar-icon" />
      </div>
      <span>{title}</span>
    </div>
  );
}
function Channel({ cid }) {
  const [dark, setDark] = React.useState(false);
  const [channel, setChannel] = React.useState(null);

  React.useEffect(() => {
    getChannel(cid)
      .then((data) => {
        setChannel(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cid]);
  console.log(channel);

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }
  return (
    <div className="channel-page">
      <Header setDark={setDark} dark={dark} />
      <div
        className={`ripple ${dark ? "ripple_enable" : "ripple_disable"}`}
      ></div>
      <div className="layout">
        <Sidebar />
        {channel && (
          <div className="channel-body">
            {channel && (
              <>
                {channel.brandingSettings.image && (
                  <div
                    className="channel-cover"
                    style={{
                      backgroundImage: `url(${channel.brandingSettings.image.bannerExternalUrl})`,
                    }}
                  ></div>
                )}
              </>
            )}
            <div className="channel-header">
              <div className="channel-author-meta">
                <div className="channel-auth-avatar">
                  <img src={channel.snippet.thumbnails.default.url} alt="" />
                </div>
                <div className="channel-auth-details">
                  <h3 className="channel-name">{channel.snippet.title}</h3>
                  <span className="channel-subscribe-count">
                    {numFormatter(channel.statistics.subscriberCount)}{" "}
                    Subscribed
                  </span>
                </div>
              </div>

              <div className="channel-header-controls">
                <button className="alert-btn-channel">
                  <img src="/alert.png" alt="" />
                </button>
                <button className="channel-subscribed-btn">
                  Subscribe {numFormatter(channel.statistics.subscriberCount)}
                </button>
              </div>
            </div>

            <div className="channel-subheader">
              <div className="channel-subheader-left">
                <div className="channel-menu">
                  <a href="#" className="channel-active-link">
                    Home
                  </a>
                  <a href="#">Videos</a>
                  <a href="#">Playlists</a>
                  <a href="#">Channels</a>
                  <a href="#">Discussion</a>
                  <a href="#">About</a>
                </div>

                <div className="channel-featured-content">
                  <div className="featured-card">
                    <div className="featured-card-cover">
                      <img src="/featured_cover.png" alt="" />
                    </div>
                    <div className="featured-card-body">
                      <h3 className="featured-card-title">
                        Choosing The Best Audio Player Software For Your
                        Computer
                      </h3>
                      <p className="featured-video-description">
                        Your cheap internet-based banner advertising will become
                        one of the sought for ads there are. Today, the world of
                        Internet advertising is rapidly evolving beyond banner
                        ads and intrusive pop-ups. Bayles A common medium for
                        advertising on the Internet is the use of banner ads.
                      </p>
                      <p className="featured-video-footer">
                        <span className="featured-video-views">11k Views</span>
                        <span className="featured-video-timestamp">
                          6 months ago
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="recommended-channels">
                <div className="recommended-channel-header">
                  <h3>Recommended Channels</h3>
                </div>
                <div className="recommendationc-channel-list">
                  <RecommendedChannel title="Flora Benson" user="/u1.png" />
                  <RecommendedChannel title="Violet Cobb" user="/u2.png" />
                  <RecommendedChannel title="Phillip Mullins" user="/u3.png" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Channel;
