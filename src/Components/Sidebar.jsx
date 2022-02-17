import React from "react";
import { connect } from "react-redux";
import Option from "./Option";
import SubscriptionComponent from "./SubsriptionOption";

function Sidebar({ subscriptions, user }) {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-top">
          <div className="sidebar-options">
            <div className="top-options">
              <Option icon="/home_colored.svg" title="Home" isActive={true} />
              <Option icon="/fire.svg" title="Trending" isActive={false} />
              <Option
                icon="/subscription.svg"
                title="Subscriptions"
                isActive={false}
              />
            </div>
            <div className="secondary-options">
              <Option icon="/file.svg" title="Library" isActive={false} />
              <Option icon="/logs.svg" title="History" isActive={false} />
              <Option icon="/clock.svg" title="Watch Later" isActive={false} />
              <Option icon="/star.svg" title="Favourites" isActive={false} />
              <Option icon="/like.svg" title="Liked Videos" isActive={false} />
              <Option icon="/note.svg" title="Music" isActive={false} />
              <Option icon="/game_remote.svg" title="Games" isActive={false} />
            </div>
          </div>
          {user && (
            <div className="sidebar-subscriptions">
              <div className="subscription-header">
                <h3>Subscriptions</h3>
              </div>
              <div className="subscriptions">
                {/* <SubscriptionComponent
                avatar="/avatar1.png"
                title="Gussie Singleton"
                id="1"
              />
              <SubscriptionComponent
                avatar="/avatar2.png"
                title="Nora Francis"
                id="2"
              />
              <SubscriptionComponent
                avatar="/avatar3.png"
                title="Belle Briggs"
                id="3"
              />
              <SubscriptionComponent
                avatar="/avatar4.png"
                title="Eunice Cortez"
                id="4"
              />
              <SubscriptionComponent
                avatar="/avatar5.png"
                title="Emma Hanson"
                id="6"
              />
              <SubscriptionComponent avatar="/avatar6.png" title="Leah Berry" /> */}

                {subscriptions &&
                  subscriptions.map((subscription) => {
                    return (
                      <SubscriptionComponent
                        avatar={subscription.snippet.thumbnails.default.url}
                        title={subscription.snippet.title}
                        id={subscription.snippet.resourceId.channelId}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        {user && (
          <div className="sidebar-bottom">
            <button>
              <img src="/gear_icon.svg" alt="gear-icon" />
              <p>Settings</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  subscriptions: state.appReducer.subscriptions,
  user: state.appReducer.user,
});
export default connect(mapStateToProps, null)(Sidebar);
