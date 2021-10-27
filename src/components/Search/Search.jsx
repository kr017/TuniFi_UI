import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useEffect } from "react";
import { useSongs } from "../../context";
import { SongTile } from "../Song/SongTile";
const useStyles = makeStyles(theme => ({
  root: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "80vh",
    padding: "10px",
    paddingLeft: "4vw",
    paddingTop: "4vh",
  },
  empty: {
    display: "flex",
    justifyContent: "center",
  },
}));
export default function Search() {
  const classes = useStyles();

  const { songsState } = useSongs();

  useEffect(() => {}, [songsState?.recentSearch]);
  return (
    <div className={classes.root}>
      {songsState?.recentSearch?.length > 0 ? (
        <div>
          Recent Search
          {songsState?.recentSearch?.map(song => (
            <Grid
              item
              xs={5}
              key={song._id}
              style={{ marginBottom: "10px", marginRight: "12px" }}
            >
              <SongTile details={song} />
            </Grid>
          ))}
        </div>
      ) : (
        <div className={classes.empty}>
          Please type in search box and hit enter button.
        </div>
      )}
    </div>
  );
}
