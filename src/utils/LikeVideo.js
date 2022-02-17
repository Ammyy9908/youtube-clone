import axios from "axios";
import Cookies from "js-cookie";

const like_video = async (id) => {
  try {
    const r = await axios.post(
      `https://youtube.googleapis.com/youtube/v3/videos/rate?id=${id}&rating=like&key=AIzaSyA_EemzA28vsHzZLiwSXamEA-KPkb-iNaU`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return r.status;
  } catch (e) {
    return null;
  }
};

export default like_video;
