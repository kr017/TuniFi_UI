import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import {
  deletePlaylist,
  getPlaylistDetails,
  removeFromPlaylist,
} from "../../apis/songServices.js";

import { useSongs } from "../../context/songsContext.js";
import { getToast } from "../../utils/utils.js";
import { SongTile } from "../Song/SongTile.jsx";
import Noplay from "../../noplay.png";

const useStyles = makeStyles(theme => ({
  root: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "80vh",
    padding: "4vh 4vh 8vh 4vh",
    // marginBottom: "20vh",
  },
  upperSection: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: "30px",
    fontWeight: 400,
  },

  bannerImgContainer: {
    height: "200px",
    width: "200px",
  },
  bannerImg: {
    height: "100%",
    width: "100%",
  },

  playlistText: {
    textTransform: "uppercase",
    fontSize: "14px",
    fontWeight: 600,
  },
  playlistName: {
    textTransform: "capitalize",
    fontSize: "30px",
    fontWeight: 600,
  },
  playlistTotal: {
    opacity: 0.7,
  },
  middleSection: {
    alignItems: "center",
    margin: "4px 0px",
  },
  player: {
    // position: "absolute",
    // right: "2vw",
    //   opacity: 0,
    height: "60px",
    width: "60px",
    borderRadius: "50%",
    backgroundColor: theme.palette.spotify,
    display: "flex",
    justifyContent: "center",
    alignItems: "Center",
    "&:hover": {
      transform: `scale(1.1)`,
    },
  },
  inactivePlayer: {
    opacity: 0.6,
    height: "60px",
    width: "60px",
    borderRadius: "50%",
    backgroundColor: theme.palette.spotify,
    display: "flex",
    justifyContent: "center",
    alignItems: "Center",
  },
}));
export default function PlaylistView(props) {
  const classes = useStyles();
  const history = useHistory();
  const selectedPlaylist = useParams();
  const [details, setDetails] = useState(null);
  const { songsState, songsDispatch } = useSongs();

  useEffect(
    () => {
      getPlaylistDetails({ playlist_id: selectedPlaylist.id }).then(res => {
        setDetails(res.data.data);
        if (res.data.data) {
          songsDispatch({
            type: "SET_CURRENT_COLOR",
            payload: res?.data?.data[0]?.color,
          });

          // songsDispatch({
          //   type: "SET_CURRENT_PLAYLIST",
          //   payload: res.data.data,
          // });
        }
      });
    },
    [selectedPlaylist?.id],
    history.listen
  );

  const handlePlayClick = details => {
    // if (!isPresent(songsState?.currentList, details._id)) {
    //   let arr = [];
    //   arr.push(details);

    songsDispatch({ type: "SET_CURRENT_PLAYLIST", payload: details.songs });
    // songsDispatch({
    //   type: "SET_CURRENT_SONG",
    //   payload: details.songs[0],
    // });
    // } else {
    //   songsDispatch({
    //     type: "SET_CURRENT_SONG",
    //     payload: details,
    //   });
    // }
    // if(songsState?.currentList.)
  };

  const handleDeletePlaylist = () => {
    deletePlaylist({ playlist_id: selectedPlaylist.id })
      .then(res => {
        let arr = songsState.playlists.filter(
          play => play._id !== selectedPlaylist.id
        );

        songsDispatch({ type: "UPDATE_PLATLISTS", payload: arr });
        getToast("SUCCESS", "Playlist deleted!!!");
        history.push("/");
      })
      .catch(err => {
        getToast("ERROR", "Something went wrong please try again");
      });
  };
  const updatePlaylist = songId => {
    removeFromPlaylist({ playlist_id: selectedPlaylist.id, song_id: songId })
      .then(res => {
        setDetails(res.data.data);

        getToast("SUCCESS", "Song removed!!!");
      })
      .catch(err => {});
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.upperSection}>
        <Grid item>
          <div className={classes.bannerImgContainer}>
            <img
              className={classes.bannerImg}
              src={details?.songs[0]?.image ? details?.songs[0]?.image : Noplay}
              alt="playlist_img"
            />
          </div>
        </Grid>
        <Grid item>
          <Typography className={classes.playlistText}>playlist</Typography>
          <Typography className={classes.playlistName}>
            {details?.name}
          </Typography>
          <Typography className={classes.playlistTotal}>
            {details?.songs?.length}{" "}
            {details?.songs?.length === 1 ? "song" : "songs"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.middleSection} spacing={3}>
        <Grid item>
          <div
            className={
              details?.songs?.length > 0
                ? classes.player
                : classes.inactivePlayer
            }
            onClick={() =>
              details?.songs?.length > 0 ? handlePlayClick(details) : null
            }
          >
            <PlayArrowIcon fontSize="large" />
          </div>
        </Grid>
        <Grid item>
          <EditIcon
            //  onClick={() => handleDeletePlaylist()}
            fontSize="large"
          />
        </Grid>
        <Grid item>
          <DeleteIcon onClick={() => handleDeletePlaylist()} fontSize="large" />
        </Grid>
      </Grid>

      {details?.songs?.map(song => (
        <div key={song._id} style={{ display: "inline-flex" }}>
          <SongTile
            horizontal={true}
            details={song}
            updatePlaylist={updatePlaylist}
          />
        </div>
      ))}
    </div>
  );
}
