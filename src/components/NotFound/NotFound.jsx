import { useHistory, useParams } from "react-router-dom";

import { Button, Grid, Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles(theme => ({
  root: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "80vh",
    marginTop: "20vh",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: theme.palette.spotify,

    fontSize: "20px",
    fontWeight: 600,
    margin: "10px",
  },
}));
export function NotFound(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "40px",
          fontWeight: 900,
        }}
      >
        <span>4</span>
        <SettingsIcon fontSize="large" />
        <span>4</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>PAGE NOT FOUND</div>
        <div>
          <Button
            className={classes.button}
            onClick={() => {
              history.push("/");
            }}
          >
            HOME
          </Button>
        </div>
      </div>
    </div>
  );
}
