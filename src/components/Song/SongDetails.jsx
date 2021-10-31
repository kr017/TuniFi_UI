import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Button, Grid, Popover } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import { makeStyles } from "@material-ui/core/styles";

import {
  addToPlaylist,
  createPlaylist,
  getAllPlaylist,
  getSongDetails,
} from "../../apis/songServices.js";

import { useSongs } from "../../context";
import { getToast } from "../../utils/utils.js";
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

  const togglePopover = e => {
    setAnchorEl(null);
  };

  const handlePlayClick = song => {
    songsDispatch({
      type: "SET_CURRENT_SONG",
      payload: song,
    });
    // songsDispatch({ type: "SET_CURRENT_PLAYLIST", payload: [] });
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
          <div>
            <div
              className={
                song?.src !== null ? classes.player : classes.inactivePlayer
              }
              onClick={() =>
                song?.src !== null ? handlePlayClick(song) : null
              }
            >
              <PlayArrowIcon fontSize="large" />
            </div>
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
