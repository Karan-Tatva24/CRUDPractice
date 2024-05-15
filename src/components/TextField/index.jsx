import { TextField as MuiTextField } from "@mui/material";
import PropTypes from "prop-types";

export const Input = ({
  className,
  id,
  label,
  value = "",
  helperText = "",
  type = "text",
  variant = "outlined",
  required = false,
  disabled = false,
  error = false,
  ...restProps
}) => {
  return (
    <MuiTextField
      className={className}
      id={id}
      label={label}
      value={value}
      type={type}
      variant={variant}
      required={required}
      disabled={disabled}
      helperText={helperText}
      error={error}
      {...restProps}
    />
  );
};

// Validation of provided Prop types.
Input.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  restProps: PropTypes.object,
  variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
};
