const initialState = {
  playerList: []
}
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        ...state,
        playerList: [...state.playerList, action.payload],
        error: false,
      };

    default:
      return {
        ...state,
      };
  }
}
