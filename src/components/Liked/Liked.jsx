import { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { SongTile } from "../Song/SongTile";

import { getLikedSongs } from "../../apis/songServices.js";
import { useSongs } from "../../context";

const useStyles = makeStyles(theme => ({
  root: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "80vh",
    padding: "4vh 4vh 8vh 4vh",
  },
}));
export function Liked() {
  const classes = useStyles();
  const { songsState, songsDispatch } = useSongs();

  useEffect(() => {
    getLikedSongs().then(response => {
      songsDispatch({
        type: "ADD_LIKED_SONG",
        payload: response?.data?.data?.songs,
      });
      songsDispatch({
        type: "SET_CURRENT_PLAYLIST",
        payload: response?.data?.data?.songs,
      });
    });
  }, []);
  return (
    <div className={classes.root}>
      <Grid container style={{ margin: "10px 4vw" }}>
        {songsState?.likedSongs?.map(song => (
          <Grid
            item
            xs={5}
            key={song._id}
            style={{ marginBottom: "10px", marginRight: "12px" }}
          >
            <SongTile details={song} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
