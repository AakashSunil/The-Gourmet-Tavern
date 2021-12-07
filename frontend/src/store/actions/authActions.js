import axios from "axios";
import { getConfig, setError } from "./commonActions";

export const signUpUser = (
  dispatch,
  name,
  email,
  phone,
  password,
  address,
  history
) => {
  axios
    .post("/user/register", { name, email, phone, password, address })
    .then((res) => {
      dispatch({
        type: "CLEAR_ERROR",
      });
      dispatch({
        type: "REGISTRATION_SUCCESS",
        payload: { ...res.data, token: res.headers["auth-token"] },
      });
      history.push("/");
    })
    .catch((err) => {
      setError(
        dispatch,
        err.response.data.message,
        err.response.status,
        "REGISTRATION_FAILURE"
      );
      dispatch({
        type: "REGISTRATION_FAILURE",
      });
    });
};

export const signInUser = (dispatch, email, password, history) => {
  axios
    .post("/user/login", { email, password })
    .then((res) => {
      dispatch({
        type: "CLEAR_ERROR",
      });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { ...res.data, token: res.headers["auth-token"] },
      });
      history.push("/");
    })
    .catch((err) => {
      setError(
        dispatch,
        err.response.data.message,
        err.response.status,
        "LOGIN_FAILURE"
      );
      dispatch({
        type: "LOGIN_FAILURE",
      });
    });
};

export const logoutUser = (dispatch, id, token, history) => {
  const headers = getConfig(token).header;

  axios.post("/user/logout", { id }, { headers: headers }).then((res) => {
    console.log(res);
    
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    dispatch({
      type: "CLEAR_ERROR",
    });
  })
  .catch(err => {
    console.log(err);
      dispatch({
          type : 'LOGOUT_FAILURE'
      });
  })
};
