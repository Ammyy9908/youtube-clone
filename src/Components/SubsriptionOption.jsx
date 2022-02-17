import React from "react";
import { useHistory } from "react-router-dom";

function SubscriptionComponent({ avatar, title, id }) {
  const history = useHistory();
  const handleChannelNavigation = () => {
    history.push(`/channel/${id}`);
  };
  return (
    <div className="subscription" onClick={handleChannelNavigation}>
      <div className="subscription-channel-avatar">
        <img src={avatar} alt="" />
      </div>
      <p>{title}</p>
    </div>
  );
}

export default SubscriptionComponent;
