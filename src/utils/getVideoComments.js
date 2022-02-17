import axios from "axios";
import Cookies from "js-cookie";
const getVideoComments = async (id) => {
  try {
    const r = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&order=relevance&textFormat=plainText&videoId=${id}&key=AIzaSyA_EemzA28vsHzZLiwSXamEA-KPkb-iNaU`,
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

export default getVideoComments;
