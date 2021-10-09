import { useSongs } from "../../context";
import { SongTile } from "../Song/SongTile";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "80vh",
  },
}));

export const DashboardContainer = () => {
  const { songsState } = useSongs();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container style={{ margin: "10px 4vw" }}>
        {songsState?.songs?.map(song => (
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
};
