import { createContext, useContext, useReducer } from "react";

const songsContext = createContext();

const songsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action?.payload };

    case "SET_RECENT_SEARCH":
      return { ...state, recentSearch: action?.payload };

    case "SET_CURRENT_PLAYLIST": {
      return {
        ...state,
        currentList: action?.payload,
        currentSong: action?.payload[0],
      };
    }
    case "UPDATE_PLATLISTS": {
      return { ...state, playlists: action?.payload };
    }

    case "SET_CURRENT_SONG": {
      return { ...state, currentSong: action?.payload };
    }
    case "SET_CURRENT_COLOR": {
      return { ...state, currentColor: action?.payload };
    }
    case "ADD_LIKED_SONG":
      return { ...state, likedSongs: action?.payload };

    case "REMOVE_LIKED_SONG":
      return {
        ...state,
        likedSongs: state.likedSongs.filter(
          song => song._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
const initalState = {
  songs: [],
  likedSongs: [],
  playlists: [],
  currentList: [],
  recentSearch: [],
  currentColor: "",
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
