export const initialState = {
  user: {},
  abilities: {},
  books: [],
  transactions: [],
  loading: true,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_REQUEST":
    case "FETCH_USER_INFO_REQUEST":
    case "FETCH_TRANSACTIONS_REQUEST":
    case "FETCH_ABILITIES_REQUEST":
      return { ...state, loading: true };
    case "FETCH_BOOKS_SUCCESS":
      return { ...state, books: action.payload, loading: false };
    case "FETCH_BOOKS_FAILURE":
      return { ...state, error: "Failed to fetch books", loading: false };
    case "FETCH_USER_INFO_SUCCESS":
      return { ...state, userInfo: action.payload, loading: false };
    case "FETCH_USER_INFO_FAILURE":
      return { ...state, error: "Failed to fetch user info", loading: false };
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
