import axios from "axios";

const getRelatedVideo = async (id) => {
  try {
    const r = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=AIzaSyA_EemzA28vsHzZLiwSXamEA-KPkb-iNaU&maxResults=15`
    );
    return r.data.items;
  } catch (e) {
    return null;
  }
};

export default getRelatedVideo;
