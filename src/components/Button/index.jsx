import { Button as MuiButton } from "@mui/material";
import PropTypes from "prop-types";

export const Button = ({
  className,
  name,
  onClick,
  disabled,
  color = "primary",
  variant = "contained",
  children,
  ...restProps
}) => {
  return (
    <MuiButton
      className={className}
      color={color}
      disabled={disabled}
      variant={variant}
      onClick={onClick}
      {...restProps}
    >
      {children}
      {name}
    </MuiButton>
  );
};

// Validation of provided Prop types.
Button.propTypes = {
  className: PropTypes.string,
  name: PropTypes.any,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  restProps: PropTypes.object,
  variant: PropTypes.oneOf(["text", "contained", "outlined"]),
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
  ]),
  children: PropTypes.node,
};
