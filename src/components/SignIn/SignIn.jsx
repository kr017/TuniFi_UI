import { Box, Button, Checkbox, Grid } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../logo.png";
import { makeStyles } from "@material-ui/core/styles";
import { OutLinedInput } from "../Common/TextInputs";
import BarLoader from "react-spinners/BarLoader";
import ErrorIcon from "@material-ui/icons/Error";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { checkMail, login } from "../../apis/userService";
import { useLogin } from "../../context";
import { SnackbarView } from "../Common/Snackbar";
import { validateEmail } from "../../utils/Theme/utilities.js/validationUtil";
import { PrimaryButton } from "../Common/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "Center",
    margin: "100px",
  },
  containerCss: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "450px",
    [theme.breakpoints.down("sm")]: {
      border: "none",
    },
    border: `1px solid #dadce0`, //${theme.palette.outline}`,
    borderRadius: "8px",
  },
  content: {
    paddingTop: "40px",
  },

  errorMsgCss: {
    marginLeft: "-14px",
    color: "#D93025",
    display: "flex",
    alignItems: "center",
  },
  usernamePillCss: {
    border: "1px solid #dadce0",
    borderRadius: "16px",
    // padding: "0 15px",
    paddingLeft: "5px",
    paddingRight: "7px",
    display: "flex",
    // alignItems: "center",
  },
  actionAreaCss: {
    display: "flex",
    justifyContent: "space-around",

    alignItems: "center",
    marginTop: "26px",
    paddingBottom: "20px",
  },
}));

export function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [passwordLayout, setPasswordLayout] = useState(false);
  const { userDispatch } = useLogin();
  const [passwordType, setPasswordType] = useState(false);
  const [username, setUsername] = useState({
    value: "",
    error: false,
    errorMsg: "",
    label: "Email",
    placeHolder: "Email",
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    errorMsg: "",
    label: "Enter your password",
    placeHolder: "Enter your password",
  });
  // eslint-disable-next-line
  const [message, setMessage] = useState("");

  const submitUsername = () => {
    if (!validateEmail(username.value)) {
      setUsername(prevState => ({
        ...prevState,
        error: true,
        errorMsg: (
          <span className={classes.errorMsgCss}>
            <ErrorIcon />
            Please enter valid email address.
          </span>
        ),
      }));
    } else {
      setLoading(true);
      checkMail({ email: username.value })
        .then(res => {
          setLoading(false);
          setPasswordLayout(true);
        })
        .catch(err => {
          if (err?.response?.status === 400) {
            setUsername(prevState => ({
              ...prevState,
              error: true,
              errorMsg: (
                <span className={classes.errorMsgCss}>
                  <ErrorIcon />
                  Couldn't find you KeepIt account
                </span>
              ),
            }));
          }
          // else {
          //   <SnackbarView open={true} />;
          // }

          setLoading(false);
        });
    }
  };
  const submitGuest = () => {
    login({
      email: "visitor@gmail.com",
      password: "1234",
    }).then(res => {
      setLoading(false);
      userDispatch({ type: "LOGIN", payload: res.data.data });
      history.push("/");
      if (res?.data?.data?.token) {
        localStorage.setItem("hint", JSON.stringify(res.data.data));
      }
    });
  };
  const submitPassword = () => {
    setLoading(true);

    login({
      email: username.value,
      password: password.value,
    })
      .then(res => {
        setLoading(false);
        userDispatch({ type: "LOGIN", payload: res.data.data });
        history.push("/");
        if (res?.data?.data?.token) {
          localStorage.setItem("hint", JSON.stringify(res.data.data));
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          setPassword(prevState => ({
            ...prevState,
            error: true,
            errorMsg: (
              <span className={classes.errorMsgCss}>
                <ErrorIcon />
                Wrong password. Try again or click Forgot password to reset it.
              </span>
            ),
          }));
        } else {
          setMessage(prevState => ({
            ...prevState,

            message: "Something went wrong please try again",
            type: "success",
            actionMsg: "OK",
            actionHandler: () => {
              history.push("/signin");
            },
          }));
        }
        setLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      {message && message?.type && <SnackbarView />}

      <Grid container className={classes.containerCss}>
        <BarLoader
          color="#1a73e8"
          loading={loading}
          width={440} //"auto"
        />
        <Grid item className={classes.content}>
          <img src={logo} alt="app-logo" height="40px" width="40px" />
        </Grid>
        {!passwordLayout ? (
          <>
            <Grid
              item
              style={{ paddingTop: "16px", fontSize: "24px", fontWeight: 600 }}
            >
              <span>Sign In</span>
            </Grid>
            <Grid item style={{ paddingTop: "8px" }}>
              <span>Use your KeepIt Account</span>
            </Grid>

            <Grid item style={{ padding: "14px 0px" }}>
              <OutLinedInput
                label={username.label}
                placeHolder={username.placeHolder}
                value={username.value}
                error={username.error}
                errorMsg={username.errorMsg}
                showLabel={username.errorMsg ? username.errorMsg : false}
                handleChange={e => {
                  setUsername(prevState => ({
                    ...prevState,
                    value: e.target.value,
                  }));
                }}
                handleKeyPress={e => {
                  if (e.key === "Enter") {
                    submitUsername();
                  }
                }}
              />

              {/* <span>Forgot email?</span> */}
            </Grid>
            <Grid>
              <Button
                onClick={() => {
                  submitGuest();
                }}
              >
                Guest Login
              </Button>
            </Grid>
            <Grid container item className={classes.actionAreaCss}>
              <Grid item>
                <span
                  style={{ color: "#1a73e8", cursor: "pointer" }}
                  onClick={() => history.push("/signup")}
                >
                  Create Account
                </span>
              </Grid>
              <Grid item>
                <PrimaryButton message="next" onClick={submitUsername} />
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              item
              style={{ paddingTop: "16px", fontSize: "24px", fontWeight: 600 }}
            >
              <span>Welcome</span>
            </Grid>
            <Grid item style={{ paddingTop: "8px" }}>
              <span className={classes.usernamePillCss}>
                <AccountCircleIcon />
                {username.value}
              </span>
            </Grid>
            <Grid item style={{ padding: "14px 0px" }}>
              <OutLinedInput
                type={!passwordType ? "password" : "text"}
                label={password.label}
                placeHolder={password.placeHolder}
                value={password.value}
                error={password.error}
                errorMsg={password.errorMsg}
                showLabel={password.errorMsg ? password.errorMsg : false}
                handleChange={e => {
                  setPassword(prevState => ({
                    ...prevState,
                    value: e.target.value,
                  }));
                }}
                handleKeyPress={e => {
                  if (e.key === "Enter") {
                    submitPassword();
                  }
                }}
              />
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  onChange={e => {
                    setPasswordType(e.target.checked);
                  }}
                  style={{ padding: "9px 0px", color: "#1a73e8" }}
                />
                <span>Show password</span>
              </Box>
              {/* <span>Forgot email?</span> */}
            </Grid>

            <Grid container item className={classes.actionAreaCss}>
              <Grid item>
                <span style={{ color: "#1a73e8", cursor: "pointer" }}>
                  Create Account
                </span>
              </Grid>
              <Grid item>
                <PrimaryButton message="next" onClick={submitPassword} />
              </Grid>
            </Grid>
            <Grid item>
              <PrimaryButton message="next" onClick={submitPassword} />
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
