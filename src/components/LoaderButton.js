import React from "react";
import { Button, Spinner } from "react-bootstrap";


export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner animation="grow" variant="white" size="sm"/>  }
      {props.children}
    </Button>
  );
}