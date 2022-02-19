const initialState = {
  user: null,
  subscriptions: null,
  randomChannel: null,
  popular_videos: null,
  local_videos: null,
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_LOCAL_VIDEOS":
      return {
        ...state,
        local_videos: action.local_videos,
      };

    case "SET_SUBSCRIPTIONS":
      return {
        ...state,
        subscriptions: action.subscriptions,
      };
    case "SET_RANDOM_CHANNEL":
      return {
        ...state,
        randomChannel: action.randomChannel,
      };

    case "SET_POPULAR_VIDEOS":
      return {
        ...state,
        popular_videos: action.popular_videos,
      };
    default:
      return state;
  }
}
