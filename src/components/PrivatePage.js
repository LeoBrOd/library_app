import PrivateNavbar from "./PrivateNavbar";
import Recomendations from "./Recomendations";
import {
  useState,
  useEffect,
  useContext,
} from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../App";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
// import GOOGLE_API_KEY from "../Constants";
// import axios from "axios";

const PrivatePage = (props) => {
  const [token, setToken] = useState({});
  const { accessToken } = useContext(AppContext);
  const navigate = useNavigate();
  const params = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    try {
      const decode = jwt_decode(accessToken);
      console.log("decode=>", decode);
      console.log(params.id);
      setToken(decode);
      const expire = decode.exp;
      if (expire * 1000 < new Date().getTime()) {
        navigate("/login");
      }
    } catch (e) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetch("/getbooks")
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => console.log(data))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <PrivateNavbar />
      {params.id == token.userId && (
        <div>
          <h1>Hello, {token.userName}</h1>
        </div>
      )}
      <Recomendations />
    </div>
  );
};

export default PrivatePage;
