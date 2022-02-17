import axios from "axios";

const getChannelVideos = async (id) => {
  console.log(id);
  try {
    const r = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyA_EemzA28vsHzZLiwSXamEA-KPkb-iNaU&channelId=${id}&part=snippet,id&order=date&maxResults=20`
    );
    return r.data.items;
  } catch (e) {
    return null;
  }
};

export default getChannelVideos;
