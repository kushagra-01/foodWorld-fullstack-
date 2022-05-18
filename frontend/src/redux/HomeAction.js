import axios from "axios";

export const LOADING = "LOADING";
export const DATA = "DATA";
export const ERR = "ERR";

export const loading = () => {
  return { type: LOADING };
};
export const Data = (payload) => ({ type: DATA, payload });
export const err = () => {
  return { type: ERR };
};

export const Food = () => (dispatch) => {
  dispatch(loading());

  axios
    .get("https://food-011.herokuapp.com")
    .then(({ data }) => {
      dispatch(Data(data));
    })
    .catch((e) => {
      dispatch(err(e));
    });
};

export const Productid = (id) => (dispatch) => {
  dispatch(loading());

  axios
    .get(`https://food-011.herokuapp.com/${id}`)
    .then(({ data }) => {
      dispatch(Data(data));
    })
    .catch((e) => {
      dispatch(err(e));
      console.log(e)
    });
};
export const Carts = () => (dispatch) => {
  dispatch(loading());

  axios
    .get("https://food-011.herokuapp.com/cart")
    .then(({ data }) => {
      dispatch(Data(data));
      console.log(data,"chhh")
    
    })
    .catch((e) => {
      dispatch(err(e));
      console.log(e)
    });
};
