import * as React from "react";
import axios from "axios";
import GOOGLE_API_KEY from "../Constants";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { AppContext } from "../App";
import {
  useState,
  useEffect,
  useContext,
} from "react";
import jwt_decode from "jwt-decode";
import PrivateNavbar from "./PrivateNavbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export default function Book() {
  const params = useParams();
  const { accessToken } = useContext(AppContext);
  const [book, setBook] = React.useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes/${params.id}?key=${GOOGLE_API_KEY}`
      )
      .then((data) => {
        setBook(data.data.volumeInfo);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleClick = async () => {
    console.log(jwt_decode(accessToken));
    try {
      const response = await axios.post(
        "/addbook",
        {
          bookId: params.id,
          userId: jwt_decode(accessToken).userId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response =>", response);
      navigate(
        `/privatepage/${
          jwt_decode(accessToken).userId
        }`
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <PrivateNavbar />
      {book ? (
        <Box sx={{ paddingTop: "50px" }}>
          <Card
            sx={{ maxWidth: "75%" }}
            key={book.id}
          >
            <CardMedia
              component="img"
              image={
                book.imageLinks.smallThumbnail
              }
              alt={book.title}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
              >
                {book.title} , {book.authors[0]}
              </Typography>
              {book.categories.map((category) => {
                return (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    key={category}
                  >
                    {category}
                  </Typography>
                );
              })}
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {book.description}
              </Typography>
              <Rating
                name="read-only"
                value={book.averageRating}
                readOnly
              />
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button
                size="small"
                onClick={handleClick}
              >
                Add to My library
              </Button>
            </CardActions>
          </Card>
        </Box>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}
