import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import { AppContext } from "../App";
import {
  areOptionsEqual,
  useSlotProps,
} from "@mui/base";

export default function FormDialog(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [msg, setMsg] = useState("");

  const { setAccessToken } =
    useContext(AppContext);

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    if (props.title == "Register") {
      try {
        const response = await axios.post(
          "/register",
          {
            email,
            password,
            firstName,
            lastName,
            userName,
            birthday,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "applicaation/json",
            },
          }
        );
        console.log("response =>", response);
        setMsg("");
        navigate("/login");
      } catch (e) {
        setMsg(e.response.data.msg);
      }
    } else {
      try {
        const response =
          await areOptionsEqual.post(
            "/login",
            { email, password },
            {
              withCredentials: true,
              headers: {
                "Content-Type":
                  "applicaation/json",
              },
            }
          );
        console.log(
          "response=>",
          response.data.token
        );
        setAccessToken(response.data.token);
        navigate("/");
      } catch (e) {
        setMsg(e.response.data.msg);
      }
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
      >
        Register
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setFirstName(e.target.value)
            }
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setLastName(e.target.value)
            }
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="User Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setUserName(e.target.value)
            }
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="birthday"
            label="Birthday"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setBirthday(e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClick}>
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
