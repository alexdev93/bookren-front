export const initialState = {
  user: (() => {
    try {
      const userFromLocalStorage = localStorage.getItem("user");
      const userFromSessionStorage = sessionStorage.getItem("user");

      if (userFromLocalStorage) {
        return JSON.parse(userFromLocalStorage);
      } else if (userFromSessionStorage) {
        return JSON.parse(userFromSessionStorage);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error parsing user data from storage:", error);
      return {};
    }
  })(),
  abilities: {},
  books: [],
  transactions: [],
  owners: [],
  loading: false,
  error: "",
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ABILITIES_REQUEST":
      return { ...state, loading: true };
    case "STORE_USER_INFO":
      return { ...state, user: action.payload, loading: true };
    case "FETCH_BOOKS_SUCCESS":
      return { ...state, books: action.payload, loading: false };
    case "FETCH_BOOKS_FAILURE":
      return { ...state, error: "Failed to fetch books", loading: false };
    case "FETCH_TRANSACTIONS_SUCCESS":
      return { ...state, transactions: action.payload, loading: false };
    case "FETCH_TRANSACTIONS_FAILURE":
      return {
        ...state,
        error: "Failed to fetch transactions",
        loading: false,
      };
    case "FETCH_ABILITIES_SUCCESS":
      return { ...state, abilities: action.payload, loading: false };
    case "FETCH_ABILITIES_FAILURE":
      return { ...state, error: "Failed to fetch abilities", loading: false };
    default:
      return state;
  }
};
