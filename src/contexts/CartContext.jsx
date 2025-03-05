import { createContext, useContext, useReducer } from "react";
import Cookies from "js-cookie";

const CartContext = createContext();

const cartReducer = (state, action) => {
  const { type, payload } = action;
  let existingItem = false;

  if (payload) {
    existingItem = state.cart.find((item) => item._id === payload._id);
  }

  const timeBeforeExpiration = new Date(new Date().getTime() + 15 * 60 * 1000);

  switch (type) {
    case "add_item":
      if (existingItem) {
        if (existingItem.quantity < payload.stock) {
          const updatedCart = state.cart.map((item) =>
            item._id === payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          const newState = {
            ...state,
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + Number(payload.price),
          };
          Cookies.set("cart", JSON.stringify(newState.cart), {
            expires: timeBeforeExpiration,
          });
          return newState;
        }
      } else {
        const newState = {
          ...state,
          cart: [...state.cart, { ...payload, quantity: 1 }],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + Number(payload.price),
        };
        Cookies.set("cart", JSON.stringify(newState.cart), {
          expires: timeBeforeExpiration,
        });
        return newState;
      }
      break;

    case "remove_item":
      if (existingItem) {
        if (existingItem.quantity > 1) {
          const updatedCart = state.cart.map((item) =>
            item._id === payload._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          const newState = {
            ...state,
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - Number(payload.price),
          };
          Cookies.set("cart", JSON.stringify(newState.cart), {
            expires: timeBeforeExpiration,
          });
          return newState;
        } else {
          const updatedCart = state.cart.filter(
            (item) => item._id !== payload._id
          );
          const newState = {
            ...state,
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - Number(payload.price),
          };
          Cookies.set("cart", JSON.stringify(newState.cart), {
            expires: timeBeforeExpiration,
          });
          return newState;
        }
      }
      break;

    case "clear_cart":
      Cookies.set("cart", JSON.stringify([]), {
        expires: timeBeforeExpiration,
      });
      return {
        ...state,
        cart: [],
        totalItems: 0,
        totalPrice: 0,
      };

    default:
      return state;
  }
};

const initialState = () => {
  const cartFromCookies = Cookies.get("cart");
  if (cartFromCookies) {
    const cart = JSON.parse(cartFromCookies);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    return { cart, totalItems, totalPrice };
  }
  return { cart: [], totalItems: 0, totalPrice: 0 };
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState());

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
