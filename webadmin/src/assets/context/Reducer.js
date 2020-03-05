const Reducer = (state, action) => {
  switch (action.type) {
      case 'NEW_EVENT':
          return {
              ...state,
              events: 1
          };
      case 'MOD_EVENT':
          return {
              ...state,
              events: 2
          };
      case 'REMOVE_EVENT':
          return {
              ...state,
              events: 3
          };
      case 'SET_ERROR':
          return {
              ...state,
              error: action.payload
          };
      default:
          return state;
  }
};

export default Reducer;