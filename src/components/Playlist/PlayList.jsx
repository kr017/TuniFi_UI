import { Button, Grid, InputBase, Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import { addToPlaylist, createPlaylist } from "../../apis/songServices.js";

import { useSongs } from "../../context";
import { getToast } from "../../utils/utils.js";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "10px 12px",
    fontSize: "18px",
    textTransform: "capitalize",
  },

  title: {
    fontSize: "30px",
    fontWeight: 400,
  },
  input: {
    border: "1px solid #9fc7f1",
    borderRadius: "4px",
    marginRight: "10px",
  },
}));

export default function PlayList(props) {
  const classes = useStyles();
  const history = useHistory();

  const { songsState, songsDispatch } = useSongs();

  const selectedSong = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [playlistName, setPlaylistName] = useState("");

  const handleAddToPlaylist = id => {
    addToPlaylist({
      song_id: props.song?._id,
      playlist_id: id,
    })
      .then(res => {
        if (res) getToast("SUCCESS", "Song Added!");
      })
      .catch(err => {
        getToast("SUCCESS", "Something went wrong please try again");
      });
  };

  const togglePopover = e => {
    setAnchorEl(null);
  };

  const handleAdd = () => {
    if (playlistName === "") {
      getToast("ERROR", "Please enter playlist name");
    } else {
      createPlaylist({ name: playlistName, song: props.song?._id })
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

  return (
    <div className={classes.root}>
      {songsState?.playlists?.map(play => (
        <div key={play._id} onClick={() => handleAddToPlaylist(play._id)}>
          {play.name}
        </div>
      ))}

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
  );
}
