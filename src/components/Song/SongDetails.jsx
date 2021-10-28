import { Button, Grid, Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  addToPlaylist,
  getAllPlaylist,
  getSongDetails,
} from "../../apis/songServices.js";

import { useSongs } from "../../context";
import UserInfoMenu from "../Dashboard/UserInfoMenu.jsx";
import PlayList from "../Playlist/PlayList.jsx";
const useStyles = makeStyles(theme => ({
  root: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "80vh",
    paddingLeft: "2vw",
    paddingTop: "4vh",
  },

  title: {
    fontSize: "30px",
    fontWeight: 400,
    textTransform: "capitalize",
  },
  imgContainer: {
    height: "200px",
    width: "200px",
  },
  img: {
    height: "100%",
    width: "100%",
  },
}));
export default function SongDetails() {
  const classes = useStyles();

  const { songsState, songsDispatch } = useSongs();

  const selectedSong = useParams();
  const [song, setSong] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    getSongDetails({ song_id: selectedSong.id }).then(res => {
      setSong(res.data.data);

      songsDispatch({
        type: "SET_CURRENT_COLOR",
        payload: res.data?.data?.color,
      });
    });
  }, []);

  const handleAddToPlaylist = () => {
    addToPlaylist({
      song_id: song._id,
      playlist_id: "61762ede4a45a53198692e4e",
    })
      .then(res => {})
      .catch(err => {});
  };

  const togglePopover = e => {
    setAnchorEl(null);
  };

  return (
    <div
      className={classes.root}
      style={
        {
          // backgroundImage:
          //   //  "Red",
          //   `linear-gradient(357deg, rgb(179 167 167 / 18%) 0%, ${
          //     song?.color ? song?.color : ""
          //   } 50%)`,
        }
      }
    >
      <Grid style={{ marginBottom: "10px", marginRight: "12px" }} container>
        <Grid item xs={12} sm={3}>
          <div
            className={classes.imgContainer}
            // onClick={() => handleTileClick(details)}
          >
            <img src={song?.image} alt={song?.title} className={classes.img} />
          </div>
        </Grid>
        <Grid item xs={12} sm={9}>
          <span
            className={classes.title}
            // onClick={() => handleTileClick(details)}
          >
            {song?.title}
          </span>
          <div>
            <Button
              onMouseOver={e => {
                setAnchorEl(e.currentTarget);
              }}
              // onMouseOut={() => {
              //   setAnchorEl(null);
              // }}
            >
              Add To playlist
            </Button>
          </div>
        </Grid>
      </Grid>

      <Popover
        open={anchorEl ? anchorEl : false}
        anchorEl={anchorEl}
        onClose={togglePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <PlayList song={song} />
      </Popover>
    </div>
  );
}
