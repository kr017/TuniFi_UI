import React, { useEffect, useState } from "react";
import { List, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ArchiveIcon from "@material-ui/icons/Archive";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";
import LoyaltyRoundedIcon from "@material-ui/icons/LoyaltyRounded";
import logo from "../../logo.png";
import { useLogin, useSongs } from "../../context";
import { useHistory } from "react-router-dom";
import { getAllPlaylist } from "../../apis/songServices.js";

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: "2px",
    //color: theme.primary,
    backgroundColor: theme.palette.sidebar,

    borderRight: `1px solid ${theme.palette.sidebar}`,
    height: "100%",
    minWidth: "200px",
    boxShadow: `0px 3px 1px -2px #d3c4c4, 0px 2px 2px 0px ${theme.palette.background.default}, 0px 1px 5px 0px #0000001f`,
  },
  drawerCss: {
    marginTop: "65px",
  },
  drawer: {
    zIndex: 0,
  },

  drawerListItemCss: {
    height: "48px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    minWidth: "90%",
    marginLeft: "8px",
    borderRadius: "10px",
    fontWeight: 600,
    opacity: 0.7,
  },
  drawerIconCss: {
    padding: "0 12px",
  },
  drawerLabelCss: {
    overflow: "hidden",
    textOverflow: "hidden",
    whiteSpace: "nowrap",
    textTransform: "capitalize",
    "&:hover": {
      transform: "scale(1.02)",
      opacity: 1,
    },
  },
  ListItemCss: {
    width: "48px",
    height: "48px",
    textAlign: "center",
    marginLeft: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    ":hover": {
      // backgroundColor: theme.palette.hover,
      color: theme.palette.primary.dark,
    },
  },
  ListItemCss_Active: {
    width: "48px",
    height: "48px",
    marginLeft: "12px",
    backgroundColor: theme.palette.hover,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    color: theme.palette.primary.dark,
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const history = useHistory();

  const { userState, userDispatch } = useLogin();
  // eslint-disable-next-line
  const { songsState, songsDispatch } = useSongs();
  // eslint-disable-next-line
  const [options, setOptions] = useState([
    {
      label: "Home",
      icon: <HomeOutlinedIcon />,
    },
    // { label: "Remainders", icon: <NotificationsNoneOutlinedIcon /> },
    // { label: "Edit Labels", icon: <EditOutlinedIcon /> },
    { label: "Search", icon: <SearchOutlinedIcon large /> },
    {
      label: "Your Library",
      icon: <SortOutlinedIcon style={{ transform: `rotate(272deg)` }} />,
    },
    {
      label: "Create Playlist",
      icon: <AddBoxRoundedIcon />,
    },
    {
      label: "Liked Songs",
      icon: <LoyaltyRoundedIcon />,
    },
  ]);

  const handleSidebarClick = key => {
    if (key === "Home") {
      history.push("/");
    } else if (key === "Search") {
      history.push("/search");
    } else if (key === "Your Library") {
      history.push("/lib");
    } else if (key === "Create Playlist") {
      history.push("/createPlay");
    } else if (key === "Liked Songs") {
      history.push("/liked");
    } else {
      history.push(`/playlist/${key._id}`);
    }
  };

  useEffect(() => {
    getAllPlaylist().then(res => {
      songsDispatch({ type: "UPDATE_PLATLISTS", payload: res.data.data });
    });
  }, []);
  return (
    <div className={classes.root}>
      <span
        style={{ display: "inline-flex", alignItems: "center", margin: "20px" }}
      >
        <img src={logo} alt="app-logo" height="40px" width="40px" />
        <Typography
          variant="h6"
          noWrap
          style={{ marginLeft: "8px", letterSpacing: "4px" }}
        >
          TuniFi
        </Typography>
      </span>
      {options?.length > 0 &&
        options.map((anchor, index) => (
          <List
            className={
              anchor.label === userState?.sidebar
                ? classes.drawerListItemCss_Active
                : classes.drawerListItemCss
            }
            key={index}
            onClick={() => handleSidebarClick(anchor.label)}
          >
            <span className={classes.drawerIconCss}>{anchor.icon}</span>
            <span className={classes.drawerLabelCss}>{anchor.label}</span>
          </List>
        ))}

      <div
        style={{
          borderTop: "1px solid lightgray",
          margin: "0px 8px",
          overflowY: "auto",
          maxHeight: "220px",
        }}
      >
        {songsState?.playlists?.length > 0 && (
          <div>
            <div
              style={{
                fontWeight: 500,
                fontSize: "18px",
                marginLeft: "12px",
                marginTop: "4px",
              }}
            >
              Playlists
            </div>
            {songsState?.playlists.map((anchor, index) => (
              <List
                className={classes.drawerListItemCss}
                key={index}
                onClick={() => handleSidebarClick(anchor)}
              >
                <span className={classes.drawerIconCss}></span>
                <span className={classes.drawerLabelCss}>{anchor.name}</span>
              </List>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
