import React, { useState } from "react";
import { List, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ArchiveIcon from "@material-ui/icons/Archive";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";
import logo from "../../logo.png";

import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import { useLogin, useSongs } from "../../context";
import { setStorage } from "../../utils/Theme/utilities.js/storageUtil";

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
    "&:hover": {
      opacity: 1,
      //transparent,
    },
  },
  drawerListItemCss_Active: {
    height: "48px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",

    minWidth: "90%",
    marginLeft: "8px",
    borderRadius: "10px",
    fontWeight: 600,
    opacity: 1,
    backgroundColor: theme.palette.hover,
    color: theme.palette.primary.dark,
  },
  drawerIconCss: {
    padding: "0 12px",
  },
  drawerLabelCss: {
    overflow: "hidden",
    textOverflow: "hidden",
    whiteSpace: "nowrap",
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
  ]);

  const handleSidebarClick = key => {
    // if (key === "Archive") {
    //   getAllNotes({ isArchieved: true })
    //     .then(function (res) {
    //       notesDispatch({ type: "GET_NOTES", payload: res.data.data });
    //     })
    //     .catch(err => {});
    // } else if (key === "Trash") {
    //   getTrashNotes().then(function (res) {
    //     notesDispatch({ type: "GET_NOTES", payload: res.data.data });
    //   });
    // } else {
    //   getAllNotes()
    //     .then(function (res) {
    //       notesDispatch({ type: "GET_NOTES", payload: res.data.data });
    //     })
    //     .catch(err => {});
    // }
    // let choice = {
    //   theme: userState?.theme,
    //   view: userState?.view,
    //   sidebar: key ? key : userState?.sidebar,
    // };
    // setStorage("choice", choice);
    // userDispatch({ type: "SETCHOICE", payload: choice });
  };
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
    </div>
  );
}
