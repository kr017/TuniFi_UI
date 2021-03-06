import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FilledFavoriteIcon from "@material-ui/icons/Favorite";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSongs } from "../../context";
import { addToLikedSongs, unlikeSong } from "../../apis/songServices.js";
import { isPresent } from "../../utils/utils";
import { useEffect } from "react";

const useStyles = makeStyles(theme => ({
  playerContainer: {
    display: "inline-flex",
    alignItems: "center",
  },
  root: {
    borderTop: `1px solid ${theme.palette.border}`,

    boxShadow: `0px 3px 1px -2px #d3c4c4, 0px 2px 2px 0px ${theme.palette.background.default},
     0px 1px 5px 0px #0000001f`,
    "& .player": {
      display: "flex",
      maxHeight: "100px",
      backgroundColor: `${theme.palette.background.default}`,
    },
    "& .details": {
      padding: "10px",
      maxWidth: "400px",
      display: "inline-flex",
      alignItems: "center",
    },
    "& .title": {
      padding: "20px",
      fontSize: "16px",
      textTransform: "capitalize",
    },
    "& .rhap_container": {
      backgroundColor: `${theme.palette.background.default}`,
      display: "flex",
      justifyItems: "center",
      padding: "15px 10px 10px 10px",
      boxShadow: "none",
    },
    "& .rhap_time": {
      color: theme.palette.primary.contrastText,
    },
    "& .rhap_progress-indicator": {
      opacity: 0,
      backgroundColor: theme.palette.primary.dark,
      width: "12px",
      height: "12px",
      marginLeft: "-10px",
      top: "-3px",
      "&:hover": {
        opacity: 1,
      },
    },
    "& .rhap_progress-filled": {
      "&:hover": {
        backgroundColor: "#1db954",
      },
    },
    "& .rhap_button-clear": {
      color: theme.palette.primary.contrastText,
    },
  },
  inactive: {
    cursor: "not-allowed",
    opacity: 0.6,
  },
  active: {
    cursor: "pointer",
  },
}));

export const Player = () => {
  const classes = useStyles();
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const { songsState, songsDispatch } = useSongs();

  useEffect(() => {
    let index = songsState?.currentList?.findIndex(
      ele => ele._id === songsState?.currentSong?._id
    );
    if (index) {
      setCurrentMusicIndex(index);
    } else {
      setCurrentMusicIndex(0);
    }
  }, [songsState?.currentList, songsState?.currentSong]);

  const handleClickPrevious = () => {
    songsDispatch({
      type: "SET_CURRENT_SONG",
      payload: songsState?.currentList[currentMusicIndex - 1],
    });
    setCurrentMusicIndex(prevState => prevState - 1);
  };

  const handleClickNext = () => {
    if (songsState?.currentList?.length - 1 === currentMusicIndex) {
      return;
    } else {
      songsDispatch({
        type: "SET_CURRENT_SONG",
        payload: songsState?.currentList[currentMusicIndex + 1],
      });
      setCurrentMusicIndex(
        prevState =>
          // prevState < songsState?.currentList.length - 1 ?
          prevState + 1
        //  : 0
      );
    }
  };

  const handleLikeClick = () => {
    addToLikedSongs({ _id: songsState?.currentSong?._id })
      .then(res => {
        songsDispatch({
          type: "ADD_LIKED_SONG",
          payload: res.data.data.songs,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleUnlikeClick = () => {
    unlikeSong({ _id: songsState?.currentSong?._id })
      .then(res => {
        songsDispatch({
          type: "REMOVE_LIKED_SONG",
          payload: songsState?.currentSong?._id, // res.data.data,
        });
      })
      .catch(err => {});
  };
  return (
    <div className={classes.root}>
      <div className="player">
        <div className="details">
          <img
            src={songsState?.currentSong?.image}
            style={{ height: "100%" }}
          />
          <span className="title">{songsState?.currentSong?.title}</span>
          <span style={{ cursor: "pointer" }}>
            {!isPresent(
              songsState?.likedSongs,
              songsState?.currentSong?._id
            ) ? (
              <FavoriteBorderIcon onClick={handleLikeClick} />
            ) : (
              <FilledFavoriteIcon
                htmlColor="#1db954"
                onClick={handleUnlikeClick}
              />
            )}
          </span>
        </div>
        <AudioPlayer
          autoPlayAfterSrcChange={true}
          showSkipControls={true}
          showJumpControls={false}
          src={songsState?.currentSong?.src}
          onClickPrevious={
            songsState?.currentList?.length === 0 || currentMusicIndex === 0
              ? null
              : handleClickPrevious
          }
          onClickNext={
            songsState?.currentList?.length === 0 ||
            songsState?.currentList?.length - 1 === currentMusicIndex
              ? null
              : handleClickNext
          }
          loop={false}
          autoPlay={true}
          muted={true}
          onEnded={handleClickNext}
          customIcons={{
            previous: (
              <SkipPreviousIcon
                fontSize="large"
                className={
                  songsState?.currentList?.length === 1
                    ? classes.inactive
                    : songsState?.currentList?.length === 0
                    ? classes.inactive
                    : currentMusicIndex === 0
                    ? classes.inactive
                    : classes.active
                }
              />
            ),
            next: (
              <SkipNextIcon
                fontSize="large"
                className={
                  songsState?.currentList?.length === 1
                    ? classes.inactive
                    : songsState?.currentList?.length === 0
                    ? classes.inactive
                    : songsState?.currentList?.length - 1 === currentMusicIndex
                    ? classes.inactive
                    : classes.active
                }
              />
            ),
          }}
          customAdditionalControls={[]}
        />
      </div>
    </div>
  );
};

/**
    <div className={classes.playerContainer}>
      <ReactPlayer
        url="https://res.cloudinary.com/dq0qx65vj/video/upload/v1633539774/tunifi/afeemii.mp3"
        className="react-player"
        width="100%"
        height="100%"
        // playing

        width="400px"
        height="50px"
        playing={false}
        controls={true}
        // light="https://i.stack.imgur.com/zw9Iz.png"
        onDuration={progress => {
          setPlayed(progress.playedSeconds);
        }}
        style={{
          backgroundColor: "red",
          color: "red",
          "-webkit-box-shadow": "15px 15px 20px rgba(0, 0, 0, 0.4)",

          "::-webkit-media-controls-panel": {
            backgroundColor: "pink",
            color: "#a0276e",
          },
        }}
        fileConfig={{
          attributes: {
            style: {
              height: "100%",
              width: "720px",
              backgroundColor: "pink",
              color: "#a0276e",
            },
          },
        }}
      />
      <input
        id="loop"
        type="checkbox"
        checked={loop}
        onChange={handleToggleLoop}
      />
    </div>
 */
