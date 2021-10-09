import {
  AppBar,
  Avatar,
  IconButton,
  InputBase,
  Popover,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import WbSunnySharpIcon from "@material-ui/icons/WbSunnySharp";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import SearchIcon from "@material-ui/icons/Search";
import ListViewIcon from "@material-ui/icons/ViewAgendaOutlined";
import GridViewIcon from "@material-ui/icons/ViewQuiltOutlined";
import { useState } from "react";
import UserInfoMenu from "../Dashboard/UserInfoMenu";
import { setStorage } from "../../utils/Theme/utilities.js/storageUtil";
import { useLogin, useSongs } from "../../context";
// import { getAllNotes } from "../../apis/noteServices";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useRouteMatch } from "react-router";
const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    margin: 0,
  },
  appBarCss: {
    // zIndex: theme.zIndex.drawer + 1,
    // borderBottom: `1px solid ${theme.palette.outline}`,
    boxShadow: "none",
  },
  inputRoot: {
    color: "inherit",

    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + 18px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  search: {
    position: "relative",
    borderRadius: "8px",
    backgroundColor: alpha(theme.palette.primary.dark, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.dark, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.secondary.dark,
  },
  toggleViewCss: {
    // display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  viewIconCss: {
    color: theme.palette.secondary.dark,
  },
  profileContaiiner: {
    // width: "150px",
    borderRadius: "12px",
    backgroundColor: theme.palette.secondary.light,
    display: "flex",
    alignItems: "center",
    padding: "4px 8px",
    fontSize: "14px",
    border: `1px solid ${theme.palette.secondary.dark}`,
    cursor: "pointer",
  },
}));
export function Header() {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { userState, userDispatch } = useLogin();
  const showSearch = useRouteMatch("/search");
  const { songsDispatch } = useSongs();

  function handleUserChoice(key) {
    let choice = {
      theme: userState?.theme,
      view: userState?.view,
      sidebar: userState?.sidebar,
    };

    if (key === "theme") {
      choice = {
        view: userState?.view,
        theme: userState?.theme === "light" ? "dark" : "light",
        sidebar: userState?.sidebar,
      };
    }
    if (key === "view") {
      choice = {
        view: userState?.view === "grid" ? "list" : "grid",
        theme: userState?.theme,
        sidebar: userState?.sidebar,
      };
    }
    setStorage("choice", choice);
    userDispatch({ type: "SETCHOICE", payload: choice });
  }

  function toggleOpenProfile(e) {
    setOpenProfile(!openProfile);
    setAnchorEl(e.currentTarget);
  }

  const handleSearch = e => {
    let search = e.target.value;
    let isArchieved = userState?.sidebar === "Archive" ? true : false;

    // getAllNotes({ search: search, isArchieved: isArchieved })
    //   .then(function (res) {
    //     notesDispatch({ type: "GET_NOTES", payload: res.data.data });
    //   })
    //   .catch(err => {});
  };
  return (
    <div className={classes.root}>
      {/* <AppBar position="fixed" className={classes.appBarCss}> */}
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          {showSearch && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginRight: "4px",
              }}
            >
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onKeyPress={e => {
                    handleSearch(e);
                  }}
                  onChange={e => {
                    handleSearch(e);
                  }}
                />
              </div>
            </span>
          )}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginRight: "8px",
          }}
        >
          <IconButton
            edge="start"
            //   className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              handleUserChoice("theme");
            }}
            style={{ marginRight: "4px" }}
          >
            {userState.theme === "dark" ? (
              <WbSunnySharpIcon style={{ color: "#ecd215" }} />
            ) : (
              <WbSunnyOutlinedIcon style={{ color: "#424040" }} />
            )}
          </IconButton>

          <div
            className={classes.profileContaiiner}
            onClick={toggleOpenProfile}
          >
            <PersonOutlineOutlinedIcon />

            <span style={{ padding: "0px 4px" }}>{"KR"}</span>
            {openProfile ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </div>
        </span>
      </Toolbar>
      {/* </AppBar> */}

      <Popover
        open={openProfile ? openProfile : false}
        anchorEl={anchorEl}
        onClose={toggleOpenProfile}
        anchorOrigin={{
          vertical: 70,
          horizontal: 0,
        }}
      >
        <UserInfoMenu />
      </Popover>
    </div>
  );
}
