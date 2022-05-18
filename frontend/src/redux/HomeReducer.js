import { DATA, ERR, LOADING } from "./HomeAction";

const initial = {
  loading: false,
  food: [],
  err: false,
};

export const HomeReducer = (store = initial, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...store, loading: true };
    case DATA:
      return { ...store, loading: false, err: false, food:[payload] };
    case ERR:
      return { ...store, err: true };

    default:
      return store;
  }
};
