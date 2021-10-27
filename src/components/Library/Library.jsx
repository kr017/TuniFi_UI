import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
  },
}));

export const Library = props => {
  const classes = useStyles();
  return <div className={classes.root}>Work in progress!!!!</div>;
};
