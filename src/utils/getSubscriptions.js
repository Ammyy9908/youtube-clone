import axios from "axios";
import Cookies from "js-cookie";

const getSubscriptions = async () => {
  try {
    const r = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=50&mine=true&key=AIzaSyA_EemzA28vsHzZLiwSXamEA-KPkb-iNaU`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return r.data.items;
  } catch (e) {
    return null;
  }
};

export default getSubscriptions;
