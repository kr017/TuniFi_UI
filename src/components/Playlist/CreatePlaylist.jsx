import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Button, Dialog, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { createPlaylist } from "../../apis/songServices.js";
import { getToast } from "../../utils/utils.js";
import { useSongs } from "../../context/songsContext.js";
const useStyles = makeStyles(theme => ({
  root: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "80vh",
  },
  input: {
    border: "1px solid #9fc7f1",
    borderRadius: "4px",
    marginRight: "10px",
  },
}));
export const CreatePlaylist = () => {
  const classes = useStyles();
  const history = useHistory();
  const { songsState, songsDispatch } = useSongs();

  const [open, setOpen] = useState(true);
  const [playlistName, setPlaylistName] = useState("");

  const handleAdd = () => {
    if (playlistName === "") {
      getToast("ERROR", "Please enter playlist name");
    } else {
      createPlaylist({ name: playlistName })
        .then(res => {
          getToast("SUCCESS", "Playlist created!!!");
          history.push(`/playlist/${res.data.data._id}`);
          let arr = songsState.playlists;
          arr.push(res.data.data);
          songsDispatch({
            type: "UPDATE_PLATLISTS",
            payload: arr,
          });
        })
        .catch(err => {
          getToast("ERROR", "Something went wrong Please try again");
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };
  return (
    <div className={classes.root}>
      <Dialog
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="simple-dialog-title"
        open={open}
        // fullWidth
        // maxWidth="xs"
      >
        <div style={{ padding: "20px", textAlign: "center" }}>
          New Playlist
          <div style={{ margin: "10px 0px" }}>
            <InputBase
              id="bootstrap-input"
              className={classes.input}
              value={playlistName}
              onChange={e => {
                setPlaylistName(e.target.value);
              }}
            />
            <Button
              variant="outlined"
              size="medium"
              style={{ borderColor: "#9fc7f1" }}
              onClick={() => handleAdd()}
            >
              SAVE
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
