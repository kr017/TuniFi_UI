import { useHistory, useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";

import { useSongs } from "../../context";
import { getToast, isPresent } from "../../utils/utils";
import { removeFromPlaylist } from "../../apis/songServices.js";
const useStyles = makeStyles(theme => ({
  root: {
    // padding: "12px",
    position: "relative",
    borderRadius: "10px",
    display: "flex",
    backgroundColor: theme.palette.hover, //"#ffffff1a",
    cursor: "pointer",
    width: "30vw",
    "& .imgContainer": {
      height: "80px",
      width: "80px",
    },
    "& .img": {
      height: "100%",
      width: "100%",
      borderRadius: "10px 0px 0px 10px",
    },

    "& .innerGrid": {
      display: "flex",
      alignItems: "center",
      padding: "0 0 0 2vw",
    },
    "& .player": {
      position: "absolute",
      right: "2vw",
      //   opacity: 0,
      height: "40px",
      width: "40px",
      borderRadius: "50%",
      backgroundColor: theme.palette.spotify,
      display: "flex",
      justifyContent: "center",
      alignItems: "Center",
      "&:hover": {
        transform: `scale(1.1)`,
      },
    },
    "&:hover .player": {
      opacity: 1,
    },

    "& .title": {
      fontSize: "16px",
      //   fontWeight: 600,
      textTransform: "capitalize",
    },
  },

  horz_root: {
    position: "relative",
    borderRadius: "10px",
    display: "flex",
    // backgroundColor: theme.palette.hover, //"#ffffff1a",
    cursor: "pointer",
    width: "80vw",
    padding: "4px",
    alignItems: "center",
    "& .horz_content": {
      padding: "0px 8px",
    },
    "& .horz_imgContainer": {
      height: "50px",
      width: "50px",
    },

    "& .img": {
      height: "100%",
      width: "100%",
      // borderRadius: "10px 0px 0px 10px",
    },
    "& .horz_title": {
      marginLeft: "12px",
      fontSize: "18px",
      textTransform: "capitalize",
    },
    "& .player": {
      position: "absolute",
      right: "2vw",
      //   opacity: 0,
      height: "40px",
      width: "40px",
      borderRadius: "50%",
      backgroundColor: theme.palette.spotify,
      display: "flex",
      justifyContent: "center",
      alignItems: "Center",
      "&:hover": {
        transform: `scale(1.1)`,
      },
    },
    "&:hover .player": {
      opacity: 1,
    },
    "& .removeCss": {
      position: "absolute",
      right: "2vw",
    },
  },
}));

export const SongTile = props => {
  const { details } = props;
  const history = useHistory();
  const selectedPlaylist = useParams();

  const { songsState, songsDispatch } = useSongs();
  const classes = useStyles();

  const handlePlaylistSongClick = details => {
    // songsDispatch({ type: "SET_CURRENT_PLAYLIST", payload: [] });
    let index = songsState?.currentList?.findIndex(
      ele => ele._id === songsState?.currentSong?._id
    );
    if (index === -1) {
      songsDispatch({ type: "SET_CURRENT_PLAYLIST", payload: [] });
    }
    songsDispatch({
      type: "SET_CURRENT_SONG",
      payload: details,
    });
  };

  const handlePlayClick = details => {
    if (props?.notPlaylist) {
      songsDispatch({ type: "SET_CURRENT_PLAYLIST", payload: [] });
      songsDispatch({
        type: "SET_CURRENT_SONG",
        payload: details,
      });
    } else {
      if (!isPresent(songsState?.currentList, details._id)) {
        let arr = [];
        arr.push(details);
        songsDispatch({ type: "SET_CURRENT_PLAYLIST", payload: arr });
      } else {
        songsDispatch({
          type: "SET_CURRENT_SONG",
          payload: details,
        });
      }
    }

    // if(songsState?.currentList.)
  };

  const handleTileClick = details => {
    history.push(`/song/${details._id}`);
  };

  const handleRemoveClick = id => {
    props.updatePlaylist(id);
  };
  return (
    <div>
      {props?.horizontal ? (
        <div className={classes.horz_root}>
          <div className="horz_content">
            <div onClick={() => handlePlaylistSongClick(details)}>
              <PlayArrowIcon />
            </div>
          </div>
          <div className="horz_content">
            <div
              className="horz_imgContainer"
              onClick={() => handleTileClick(details)}
            >
              <img src={details.image} alt={details.title} className="img" />
            </div>
          </div>
          <div className="horz_content">
            <span
              className="horz_title"
              onClick={() => handleTileClick(details)}
            >
              {details.title}
            </span>
          </div>{" "}
          <div>
            <span
              onClick={() => handleRemoveClick(details._id)}
              className="removeCss"
            >
              <RemoveCircleOutlineOutlinedIcon />
            </span>
          </div>
        </div>
      ) : (
        <div className={classes.root}>
          <div
            className="imgContainer"
            onClick={() => handleTileClick(details)}
          >
            <img src={details.image} alt={details.title} className="img" />
          </div>
          <div className="innerGrid">
            <span className="title" onClick={() => handleTileClick(details)}>
              {details.title}
            </span>
            <div className="player" onClick={() => handlePlayClick(details)}>
              <PlayArrowIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
