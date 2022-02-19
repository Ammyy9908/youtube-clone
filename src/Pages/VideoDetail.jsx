import React from "react";
import Header from "../Components/Header";
import { useHistory, useLocation } from "react-router-dom";
import "./VideoPage.css";
import getRelatedVideo from "../utils/getRelatedVideos";
import axios from "axios";
import { connect } from "react-redux";
import like_video from "../utils/LikeVideo";
import dislike_video from "../utils/DisLikeVideo";
import getChannel from "../utils/getChannel";
import { BsFilterLeft } from "react-icons/bs";
import getVideoComments from "../utils/getVideoComments";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import LikeIcon from "../assetsComponents/LikeIcon";
import LikedIcon from "../assetsComponents/LikedIcon";
import UnLikedIcon from "../assetsComponents/UnLikedIcon";
import UnlikeIcon from "../assetsComponents/UnlikeIcon";
import ShareIcon from "../assetsComponents/ShareIcon";
import { MdOutlineClose, MdMailOutline } from "react-icons/md";
import {
  FaFacebook,
  FaWhatsapp,
  FaTwitter,
  FaReddit,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa";
TimeAgo.addDefaultLocale(en);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function RealtedVideoCard({ video }) {
  const history = useHistory();

  const handlePlay = () => {
    history.push(`/watch?v=${video.id.videoId}`);
  };

  return (
    <div className="related-video-card" onClick={handlePlay}>
      <div className="related-video-cover">
        <img
          src={video && video.snippet && video.snippet.thumbnails.high.url}
          alt=""
        />
      </div>
      <div className="related-video-footer">
        <h3>{video.snippet.title}</h3>
        <p className="related-video-meta">
          <span className="video-count">123k views</span>
          <span className="video-author">Dollie Blair</span>
        </p>
      </div>
    </div>
  );
}

function VideoComment({ author, author_name, comment, replies, time }) {
  console.log("Replies", replies);
  return (
    <div className="video-comment">
      <div className="video-author">
        <img src={author} alt="" />
      </div>
      <div className="video-comment-meta">
        <div className="comment-user">
          <p className="comment-author-name">{author_name}</p>
          <span>{<ReactTimeAgo date={time} locale="en-US" />}</span>
        </div>

        <p className="comment">{comment}</p>
        {replies && <a href="#view">View {replies.length} replies</a>}
      </div>
    </div>
  );
}

function ShareModal({ url, setModal, share_modal }) {
  const handleModalClose = (e) => {
    if (
      e.target.classList.contains("share-popup") ||
      e.target.classList.contains("modal-close")
    ) {
      setModal(false);
    }
  };
  return (
    <div
      className={`share-popup ${share_modal && "share-popup-enable"}`}
      onClick={handleModalClose}
    >
      <div className="share-modal">
        <div className="share-modal-wrapper">
          <div className="share-modal-header">
            <h3>Share</h3>
            <button className="modal-close">
              <MdOutlineClose />
            </button>
          </div>
          <div className="share-platforms-wrapper">
            <div className="share-platform">
              <FaFacebook />
            </div>
            <div className="share-platform">
              <FaWhatsapp />
            </div>
            <div className="share-platform">
              <FaTwitter />
            </div>
            <div className="share-platform">
              <MdMailOutline />
            </div>
            <div className="share-platform">
              <FaReddit />
            </div>
            <div className="share-platform">
              <FaPinterest />
            </div>
            <div className="share-platform">
              <FaLinkedin />
            </div>
          </div>

          <div className="video-url">
            <p>{url}</p>
            <button className="link-copy-btn">Copy</button>
          </div>

          <div className="seperator"></div>
        </div>
      </div>
    </div>
  );
}

function VideoDetail({ subscriptions, user }) {
  const query = useQuery();
  console.log(query.get("v"));
  const id = query.get("v");
  const [dark, setDark] = React.useState(false);
  const [videos, setVideos] = React.useState(null);
  const [video, setVideo] = React.useState(null);
  const [channel, setChannel] = React.useState(null);
  const [like, setLike] = React.useState(false);
  const [unlike, setUnLike] = React.useState(false);
  const [comments, setComments] = React.useState(null);
  const [share_modal, setModal] = React.useState(false);
  const [video_url, setVideoUrl] = React.useState(null);

  // Fetch YouTube Videos that related to current video id

  React.useEffect(() => {
    getRelatedVideo(id)
      .then((data) => {
        setVideos(data);
      })
      .catch((e) => {
        console.log(e);
      });

    const findVideo = async (id) => {
      try {
        const r = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyA_EemzA28vsHzZLiwSXamEA-KPkb-iNaU`
        );
        return r.data.items[0];
      } catch (e) {
        return null;
      }
    };

    findVideo(id)
      .then((data) => {
        setVideo(data);
        return data.snippet.channelId;
      })
      .then((id) => {
        console.log("Channel Id=>", id);
        getChannel(id)
          .then((data) => {
            setChannel(data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });

    // get video Comments

    getVideoComments(id)
      .then((data) => {
        console.log("Comments", data);
        setComments(data);
      })
      .catch((e) => {});
  }, [id]);

  // handle like

  const handleLike = () => {
    like_video(id)
      .then((status) => {
        if (status === 204) {
          setLike(true);
          setUnLike(false);
        } else {
          alert("Already liked");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDisLike = () => {
    dislike_video(id)
      .then((status) => {
        console.log(status);
        if (status === 204) {
          setUnLike(true);
          setLike(false);
        } else {
          alert("Already liked");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // detect is i already subscribed to this channel

  const isSubscribed = () => {
    const index = subscriptions.findIndex((sub) => {
      return sub.snippet.resourceId.channelId === channel.id;
    });

    if (index !== -1) {
      return true;
    }
    return false;
  };

  console.log("channel=>", channel);
  console.log("Video", video);
  return (
    <div className="video-detail">
      <ShareModal
        setModal={setModal}
        share_modal={share_modal}
        url={video_url}
      />
      <Header setDark={setDark} dark={dark} />
      <div
        className={`ripple ${dark ? "ripple_enable" : "ripple_disable"}`}
      ></div>

      <div className="video-page-layout">
        <div className="video-page-left">
          <div className="custom-video-area">
            <div className="custom-video">
              <iframe
                src={`https://www.youtube.com/embed/${id}?controls=0&amp;start=1&autoplay=1`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="custom-video-meta">
              <div className="video-tags">
                {video &&
                  video.snippet &&
                  video.snippet.tags
                    .sort()
                    .slice(0, 6)
                    .map((tag) => {
                      return (
                        <span className="tag" key={tag}>
                          <a href="#viewtag">#{tag + " "}</a>
                        </span>
                      );
                    })}
              </div>
              <h2>{video && video.snippet.title}</h2>
              <p className="custom-video-meta-info">
                <span className="video-views">
                  {video && video.statistics.viewCount}k Views
                </span>
                <span className="video-controls">
                  <button className="video-control" onClick={handleLike}>
                    {!like ? <LikeIcon /> : <LikedIcon />}{" "}
                    {video && video.statistics.likeCount}k
                  </button>
                  <button className="video-control" onClick={handleDisLike}>
                    {unlike ? <UnLikedIcon /> : <UnlikeIcon />}Dislike
                  </button>
                  <button
                    className="video-control"
                    onClick={() => {
                      setModal(true);
                      setVideoUrl("http://localhost:3000/w/" + id);
                    }}
                  >
                    <ShareIcon /> Share
                  </button>
                  <button className="video-control">
                    <svg
                      viewBox="0 0 24 24"
                      preserveAspectRatio="xMidYMid meet"
                      focusable="false"
                      class="style-scope yt-icon"
                    >
                      <g class="style-scope yt-icon">
                        <path
                          d="M7.5,12c0,0.83-0.67,1.5-1.5,1.5S4.5,12.83,4.5,12s0.67-1.5,1.5-1.5S7.5,11.17,7.5,12z M12,10.5c-0.83,0-1.5,0.67-1.5,1.5 s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5S12.83,10.5,12,10.5z M18,10.5c-0.83,0-1.5,0.67-1.5,1.5s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5 S18.83,10.5,18,10.5z"
                          class="style-scope yt-icon"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </span>
              </p>
            </div>
            <div className="seperator"></div>
            <div className="custom-video-channel-details-wrapper">
              <div className="video-channel-detail">
                {channel && (
                  <div className="video-channel-avatar">
                    <img src={channel.snippet.thumbnails.default.url} alt="" />
                  </div>
                )}
                <div className="video-channel-meta">
                  <h3>{video && video.snippet.channelTitle}</h3>
                </div>
              </div>

              {channel && (
                <div className="video-channel-controls">
                  <button className="video-channel-subscribe-btn">
                    {isSubscribed() ? "Subscribed" : "Subscribe"} 2.3m
                  </button>
                </div>
              )}
            </div>
            <p className="video-description">
              {video && video.snippet.description.length < 272
                ? video.snippet.description.split("\n").map((line) => {
                    return (
                      <span>
                        {line}
                        <br />
                      </span>
                    );
                  })
                : video &&
                  video.snippet.description
                    .slice(0, 272)
                    .split("\n")
                    .map((line) => {
                      return (
                        <span>
                          {line}
                          <br />
                        </span>
                      );
                    })}
            </p>
            <a href="#more">Show More</a>
            <div className="seperator"></div>
            <div className="video-comments-wrapper">
              <div className="video-comment-header">
                <span className="video-comment-count">
                  {video && video.statistics.commentCount} Comments
                </span>
                <button className="comment-filter">
                  <BsFilterLeft /> SORT BY
                </button>
              </div>

              {user && (
                <div className="new-comment-wrapper">
                  <div className="new-comment-user-avatar">
                    <img src={user.picture} alt="user-avatar" />
                  </div>
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="New Comment"
                  />
                </div>
              )}

              <div className="video-comments">
                {comments &&
                  comments.map((comment, i) => {
                    return (
                      <VideoComment
                        author={
                          comment.snippet.topLevelComment.snippet
                            .authorProfileImageUrl
                        }
                        author_name={
                          comment.snippet.topLevelComment.snippet
                            .authorDisplayName
                        }
                        comment={
                          comment.snippet.topLevelComment.snippet.textDisplay
                        }
                        replies={comment.replies && comment.replies.comments}
                        time={
                          comment.snippet.topLevelComment.snippet.publishedAt
                        }
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="related-videos-wrapper">
          <div className="related-video-header">
            <h3>Next</h3>
            <button className="switch"></button>
          </div>

          {videos && (
            <div className="related-videos">
              {videos
                .filter((video) => video.snippet)
                .map((video, i) => {
                  return <RealtedVideoCard key={i} video={video} />;
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  subscriptions: state.appReducer.subscriptions,
  user: state.appReducer.user,
});
export default connect(mapStateToProps, null)(VideoDetail);
