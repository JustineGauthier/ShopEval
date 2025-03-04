import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  const { type, payload } = action;
  const existingItem = state.cart.find((item) => item._id === payload._id);

  switch (type) {
    case "add_item":
      if (existingItem) {
        if (existingItem.quantity < payload.stock) {
          const updatedCart = state.cart.map((item) =>
            item._id === payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          return {
            ...state,
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + Number(payload.price),
          };
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...payload, quantity: 1 }],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + Number(payload.price),
        };
      }
      return state;

    case "remove_item":
      if (existingItem) {
        if (existingItem.quantity > 1) {
          const updatedCart = state.cart.map((item) =>
            item._id === payload._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          return {
            ...state,
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - Number(payload.price),
          };
        } else {
          const updatedCart = state.cart.filter(
            (item) => item._id !== payload._id
          );
          return {
            ...state,
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - Number(payload.price),
          };
        }
      }
      return state;

    default:
      return state;
  }
};

const initialState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = {
    cart: state.cart,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    dispatch,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

export const useCartContext = () => useContext(CartContext);
