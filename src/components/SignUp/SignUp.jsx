import { Grid } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../logo.png";
import { makeStyles } from "@material-ui/core/styles";
import { OutLinedInput } from "../Common/TextInputs";
import BarLoader from "react-spinners/BarLoader";
import ErrorIcon from "@material-ui/icons/Error";
import { signup } from "../../apis/userService";
import { useLogin } from "../../context";
import { PrimaryButton } from "../Common/Button";
import { validateEmail } from "../../utils/Theme/utilities.js/validationUtil";
import { SnackbarView } from "../Common/Snackbar";

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

export function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [passwordLayout, setPasswordLayout] = useState(false);
  // eslint-disable-next-line
  const { userDispatch } = useLogin();

  const [name, setName] = useState({
    value: "",
    error: false,
    errorMsg: "",
    label: "Name",
    placeHolder: "Name",
  });
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
  const [message, setMessage] = useState({});

  const submitDetails = () => {
    setLoading(true);
    signup({
      name: name.value,
      email: username.value,
      password: password.value,
    })
      .then(res => {
        setLoading(false);
        setMessage(prevState => ({
          ...prevState,

          message: "Registration Successful! Please login",
          type: "success",
          actionMsg: "OK",
          actionHandler: () => {
            history.push("/signin");
          },
        }));
      })
      .catch(err => {
        setMessage(prevState => ({
          ...prevState,

          message: err?.response?.data?.message
            ? err?.response?.data?.message
            : "Something went wrong please try again",
          type: "error",
          actionMsg: "OK",
          actionHandler: () => {
            setName(prevState => ({
              ...prevState,
              value: "",
            }));
            setPassword(prevState => ({
              ...prevState,
              value: "",
            }));
            setUsername(prevState => ({
              ...prevState,
              value: "",
            }));
            setMessage(null);
          },
        }));
        setLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      {message && message?.type && <SnackbarView message={message} />}
      <Grid container className={classes.containerCss}>
        <BarLoader
          color="#1a73e8"
          loading={loading}
          width={440} //"auto"
        />
        <Grid item className={classes.content}>
          <img src={logo} alt="app-logo" height="40px" width="40px" />
        </Grid>

        <Grid item style={{ paddingTop: "8px" }}>
          <span>Create your KeepIt Account</span>
        </Grid>
        <Grid item style={{ padding: "14px 0px" }}>
          <OutLinedInput
            label={name.label}
            placeHolder={name.placeHolder}
            value={name.value}
            error={name.error}
            errorMsg={name.errorMsg}
            showLabel={name.errorMsg ? name.errorMsg : false}
            handleChange={e => {
              setName(prevState => ({
                ...prevState,
                value: e.target.value,
              }));
            }}
            handleKeyPress={e => {
              if (e.key === "Enter") {
              }
            }}
          />
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
              if (!validateEmail(username.value)) {
                setUsername(prevState => ({
                  ...prevState,
                  value: e.target.value,
                  error: true,
                  errorMsg: (
                    <span className={classes.errorMsgCss}>
                      <ErrorIcon />
                      Please enter valid email address.
                    </span>
                  ),
                }));
              } else {
                setUsername(prevState => ({
                  ...prevState,
                  value: e.target.value,
                  error: false,
                  errorMsg: null,
                }));
              }
            }}
            handleKeyPress={e => {
              if (e.key === "Enter") {
              }
            }}
          />
        </Grid>
        <Grid item style={{ padding: "14px 0px" }}>
          <OutLinedInput
            label={password.label}
            type="password"
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
                // submitPassword();
              }
            }}
          />
        </Grid>

        <Grid container item className={classes.actionAreaCss}>
          <Grid item>
            <span
              style={{ color: "#1a73e8", cursor: "pointer" }}
              onClick={() => history.push("/signin")}
            >
              Sign in instead
            </span>
          </Grid>
          <Grid item>
            <PrimaryButton message="sign up" onClick={submitDetails} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
