import books from "../books.json";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { Genres } from "../Genres";
import GOOGLE_API_KEY from "../Constants";
import FormControl from "@mui/material/FormControl";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function ImgMediaCard() {
  const [recomendations, setRecomendations] =
    useState([]);
  const [genre, setGenre] =
    React.useState("fiction");
  const [searchWord, setSearchWord] =
    useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setGenre(event.target.value);
  };
  // axios
  //   .get(
  //     `https://www.googleapis.com/books/v1/volumes?q=${searchWord}&subject:${genre}&maxResults=10&key=${GOOGLE_API_KEY}`
  //   )
  //   .then((data) => console.log(data.data.items))
  //   .catch((e) => console.log(e));

  return (
    <div>
      <h2>Here some recommendations for you</h2>
      <div>
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            display: "inline",
          }}
        >
          <TextField
            id="outlined-select-currency"
            select
            label="Genre"
            value={genre}
            onChange={handleChange}
            helperText="Please select your genre"
          >
            {Genres.map((item) => {
              return (
                <MenuItem
                  key={item}
                  value={item.toLowerCase()}
                >
                  {item}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            id="outlined-basic"
            label="Let's search..."
            variant="outlined"
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
        </FormControl>
      </div>
      <Box
        sx={{
          height: 255,
          display: "block",
          maxWidth: "100%",
          overflow: "auto",
        }}
      >
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ width: "75%" }}
        >
          {books.map((item) => (
            <img
              key={item.id}
              src={
                item.volumeInfo.imageLinks
                  .smallThumbnail
              }
              alt={item.volumeInfo.title}
              loading="lazy"
              onClick={(e) => {
                navigate(`/books/${item.id}`);
              }}
            />
          ))}
        </Stack>
      </Box>
    </div>
  );
}
