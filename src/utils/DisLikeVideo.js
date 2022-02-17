import axios from "axios";
import Cookies from "js-cookie";

const dislike_video = async (id) => {
  try {
    const r = await axios.post(
      `https://youtube.googleapis.com/youtube/v3/videos/rate?id=${id}&rating=dislike&key=AIzaSyA_EemzA28vsHzZLiwSXamEA-KPkb-iNaU`,
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

export default dislike_video;
