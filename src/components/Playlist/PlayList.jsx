import { Button, Grid, Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import { addToPlaylist } from "../../apis/songServices.js";

import { useSongs } from "../../context";

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
}));

export default function PlayList(props) {
  const classes = useStyles();

  const { songsState } = useSongs();

  const selectedSong = useParams();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAddToPlaylist = id => {
    console.log(props.song?._id);
    addToPlaylist({
      song_id: props.song?._id,
      playlist_id: id,
    })
      .then(res => {
        toast.error("Something went wrong please try again", {
          position: "top-center",
        });
      })
      .catch(err => {
        toast.error("Something went wrong please try again", {
          position: "top-center",
        });
      });
  };

  const togglePopover = e => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {songsState?.playlists?.map(play => (
        <div key={play._id} onClick={() => handleAddToPlaylist(play._id)}>
          {play.name}
        </div>
      ))}
    </div>
  );
}
