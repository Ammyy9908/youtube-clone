import axios from "axios";

const getLocalVideos = async (lat, long) => {
  try {
    const r = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=${lat}%2C%20${long}&locationRadius=50km&maxResults=50&order=date&type=video%2Clist&key=AIzaSyA_EemzA28vsHzZLiwSXamEA-KPkb-iNaU`
    );
    return r.data;
  } catch (e) {
    return null;
  }
};

export default getLocalVideos;
