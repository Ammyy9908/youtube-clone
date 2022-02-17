import axios from "axios";
import Cookies from "js-cookie";

const getUser = async () => {
  try {
    const r = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${Cookies.get(
        "token"
      )}`
    );
    return r.data;
  } catch (e) {
    return null;
  }
};

export default getUser;
