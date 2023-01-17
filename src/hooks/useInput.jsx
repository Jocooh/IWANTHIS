import { useReducer } from "react";

const useInput = (initialState) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.name]: action.text,
        };
      case "CHANGE_RESET":
        return {
          ...state,
          title: "",
          content: "",
          url: "",
          price: "",
        };
      default:
        return;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e, name) => {
    const { text } = e.nativeEvent;
    dispatch({ type: "CHANGE_INPUT", name, text });
  };

  const reset = () => {
    dispatch({ type: "CHANGE_RESET" });
  };

  return [state, onChange, reset]
};

export default useInput;
