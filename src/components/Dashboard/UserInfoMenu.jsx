import React from "react";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useLogin } from "../../context";

const useStyles = makeStyles(theme => ({
  root: {
    width: "354px",
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      width: "280px",
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: "0 auto",
  },
  AvtarContainerCss: {
    // display: "flex",
    textAlign: "center",
    borderBottom: `1px solid ${theme.palette.border}`,
    padding: "16px 0px",
  },
  nameCss: {
    color: theme.palette.primary.dark,
    fontSize: "16px",
  },
  emailCss: {
    fontSize: "14px",
  },
  contentCss: {
    display: "flex",
    justifyContent: "center",
    borderBottom: `1px solid ${theme.palette.border}`,
    padding: "16px 0px",
  },
  privacyDiv: {
    textAlign: "center",
    margin: "14px 30px",
  },
  spanCss: {
    padding: "4px",
  },
}));

export default function UserInfoMenu(props) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  const { userState, userDispatch } = useLogin();

  const handleLogOut = () => {
    userDispatch({ type: "LOGOUT" });
    history.push("/signin");
  };
  return (
    <div className={classes.root}>
      <div className={classes.AvtarContainerCss}>
        <div style={{ marginBottom: "10px" }}>
          <Avatar
            alt={userState.name}
            src="/static/images/avatar/1.jpg"
            className={classes.large}
          />
        </div>
        <div className={classes.nameCss}>{userState.name}</div>
        <div className={classes.emailCss}>{userState.email}</div>
      </div>
      <div className={classes.contentCss}>
        <Button
          style={{
            textTransform: "capitalize",
            border: `1px solid ${theme.palette.border}`,
          }}
          onClick={() => handleLogOut()}
        >
          Sign Out
        </Button>
      </div>
      <div className={classes.privacyDiv}>
        <span className={classes.spanCss}>Privacy Policy</span>
        <span className={classes.spanCss}>Terms of Service</span>
      </div>
    </div>
  );
}
