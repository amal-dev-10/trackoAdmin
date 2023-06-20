// src/redux/reducers/index.ts

const initialState = {
  counter: 0,
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

export default rootReducer;
