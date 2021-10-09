import { makeStyles } from "@material-ui/core/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
const useStyles = makeStyles(theme => ({
  root: {
    // padding: "12px",
    position: "relative",
    borderRadius: "10px",
    display: "flex",
    backgroundColor: "#ffffff1a",
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
}));

export const SongTile = props => {
  const { details } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="imgContainer">
        <img src={details.image} alt={details.title} className="img" />
      </div>
      <div className="innerGrid">
        <span className="title">{details.title}</span>
        <div className="player">
          <PlayArrowIcon />
        </div>
      </div>
    </div>
  );
};
