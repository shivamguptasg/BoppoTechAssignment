import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    myCart: [],
    productList: [
      {id: 1, name: 'Fruty', price: 20},
      {id: 2, name: 'Slice', price: 12},
      {id: 3, name: 'Maza', price: 25},
      {id: 4, name: 'Mirinda', price: 35},
      {id: 5, name: 'Pepsi', price: 40},
    ],
    selectedProductId: null,
    quantity: 0,
  },
  reducers: {
    setAuth: (state, action) => {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    },
    addToCart: (state, action) => {
      return {
        ...state,
        myCart: action.payload,
      };
    },

    setSelectedProductId: (state, action) => {
      return {
        ...state,
        selectedProductId: action.payload,
      };
    },

    setQuantity: (state, action) => {
      return {
        ...state,
        quantity: action.payload,
      };
    },
  },
});

export const {addToCart, setAuth, setSelectedProductId, setQuantity} =
  userSlice.actions;

export default userSlice.reducer;
