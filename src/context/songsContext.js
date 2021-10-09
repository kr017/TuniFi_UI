import { createContext, useContext, useReducer } from "react";

const songsContext = createContext();

const songsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action?.payload };

    case "SET_CURRENT_PLAYLIST": {
      return { ...state, currentList: action?.payload };
    }
    case "UPDATE_PLATLISTS": {
      return { ...state, playlists: action?.payload };
    }

    case "SET_CURRENT_SONG": {
      return { ...state, currentSong: action?.payload };
    }
    default:
      return state;
  }
};
const initalState = {
  songs: [],
  likedSongs: [],
  playlists: [],
  currentList: [],
};

export const SongsProvider = ({ children }) => {
  const [songsState, songsDispatch] = useReducer(songsReducer, initalState);

  return (
    <songsContext.Provider value={{ songsState, songsDispatch }}>
      {children}
    </songsContext.Provider>
  );
};

export const useSongs = () => {
  return useContext(songsContext);
};
