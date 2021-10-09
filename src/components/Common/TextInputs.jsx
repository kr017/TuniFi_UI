import { makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";
const useStyles = makeStyles(theme => ({
  inputCss: {
    width: "310px",
  },
}));
export const OutLinedInput = props => {
  const classes = useStyles();
  const {
    label,
    showLabel,
    value,
    error,
    errorMsg,
    placeHolder,
    type,
    handleChange,
    handleKeyPress,
  } = props;
  const [activeLabel, setActiveLabel] = useState(false);

  return (
    <TextField
      type={type ? type : "text"}
      // id={id}
      label={showLabel ? label : activeLabel ? label : null}
      variant="outlined"
      value={value}
      placeholder={placeHolder}
      error={error}
      onClick={e => setActiveLabel(true)}
      helperText={errorMsg}
      color="primary"
      className={classes.inputCss}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};

// export { OutLinedInput };
