import { createContext, useContext, useReducer } from "react";
import { getStorage } from "../utils/Theme/utilities.js/storageUtil";

const userContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const userChoice = getStorage("choice");
      return {
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
        theme: userChoice?.theme ? userChoice.theme : "light",
        view: userChoice?.view ? userChoice.view : "grid",
        sidebar: "Notes",
      };

    case "LOGOUT":
      return {
        name: "",
        email: "",
        token: "",
      };

    case "SETCHOICE":
      let token = JSON.parse(localStorage.getItem("hint"));

      return {
        token: token.token,
        iname: token?.name,
        email: token?.email,
        theme: action.payload?.theme ? action.payload?.theme : "light",
        view: action.payload?.view ? action.payload?.view : "grid",
        sidebar: action.payload?.sidebar ? action.payload?.sidebar : "Notes",
      };

    default:
      return;
  }
};

const initalState = { name: "", email: "", token: "" };

export const UserProvider = ({ children }) => {
  let token = JSON.parse(localStorage.getItem("hint"));
  const userChoice = getStorage("choice");
  if (token) {
    initalState.token = token.token;
    initalState.name = token?.name;
    initalState.email = token?.email;
    initalState.theme = userChoice?.theme ? userChoice?.theme : "light";
  }

  const [userState, userDispatch] = useReducer(userReducer, initalState);

  return (
    <userContext.Provider value={{ userState, userDispatch }}>
      {children}
    </userContext.Provider>
  );
};

export const useLogin = () => {
  return useContext(userContext);
};
