const initialState = {
  user: null,
  subscriptions: null,
  randomChannel: null,
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
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
    default:
      return state;
  }
}
