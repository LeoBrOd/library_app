import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ButtonAppBar(props) {
  return (
    <Stack spacing={2} direction="row">
      <Typography
        variant="h7"
        sx={{ flexGrow: 1 }}
        component={Link}
        to="/"
      >
        Your favorite library app
      </Typography>
      <Button
        color="inherit"
        component={Link}
        to="/register"
      >
        Register
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/login"
      >
        Login
      </Button>
    </Stack>
  );
}
