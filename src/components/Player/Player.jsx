import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
// import ReactPlayer from "react-player";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const useStyles = makeStyles(theme => ({
  playerContainer: {
    display: "inline-flex",
    alignItems: "center",
  },
  root: {
    // borderTop: "1px solid",

    boxShadow: `0px 3px 1px -2px #d3c4c4, 0px 2px 2px 0px ${theme.palette.background.default},
     0px 1px 5px 0px #0000001f`,
    "& .rhap_container": {
      backgroundColor: `${theme.palette.background.default}`,
      display: "flex",
      justifyItems: "center",
      padding: "15px 10px 10px 10px",
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
}));

export const Player = () => {
  const classes = useStyles();
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);

  const playlist = [
    {
      name: "枝芽",
      src: "https://res.cloudinary.com/dq0qx65vj/video/upload/v1633539985/tunifi/SoorajKiBahoonMein.mp3",
    },
    {
      name: "自由女神",
      src: "https://res.cloudinary.com/dq0qx65vj/video/upload/v1633539981/tunifi/jaisaMeraTu.mp3",
    },
    {
      name: "无雨无晴",
      src: "https://res.cloudinary.com/dq0qx65vj/video/upload/v1633539774/tunifi/afeemii.mp3",
    },
  ];

  const handleClickPrevious = () => {
    setCurrentMusicIndex(prevState => {
      return prevState === 0 ? playlist.length - 1 : prevState - 1;
    });
  };

  const handleClickNext = () => {
    setCurrentMusicIndex(prevState =>
      prevState < playlist.length - 1 ? prevState + 1 : 0
    );
  };
  return (
    <div className={classes.root}>
      <div className="player">
        <AudioPlayer
          autoPlayAfterSrcChange={true}
          showSkipControls={true}
          showJumpControls={false}
          src={playlist[currentMusicIndex].src}
          onClickPrevious={handleClickPrevious}
          onClickNext={handleClickNext}
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
