import axios from "axios";
import Cookies from "js-cookie";
const getChannel = async (id) => {
  try {
    const r = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=status,contentDetails,snippet%2CcontentDetails%2Cstatistics%2CbrandingSettings&id=${id}&key=AIzaSyA_EemzA28vsHzZLiwSXamEA-KPkb-iNaU`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return r.data.items[0];
  } catch (e) {
    return null;
  }
};

export default getChannel;
