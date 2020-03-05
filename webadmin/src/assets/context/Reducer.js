const Reducer = (state, action) => {
  switch (action.type) {
      case 'MOD_EVENT':
          return {
              ...state,
              event: action.payload
          };
      case 'NEW_EVENT':
          return {
              ...state,
              event: 2
          };
      case 'REMOVE_EVENT':
          return {
              ...state,
              event: 3
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