import axios from "axios";
import Cookies from "js-cookie";

const get_popular_videos = async () => {
  try {
    const r = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=AIzaSyA_EemzA28vsHzZLiwSXamEA-KPkb-iNaU&maxResults=100`,
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      }
    );

    return r.data.items;
  } catch (e) {
    return null;
  }
};

export default get_popular_videos;
