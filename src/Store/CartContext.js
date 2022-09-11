import react from "react";

const CartContext = react.createContext({
	items: [],
	numberOfItems: 0,
	totalamount: 0,
	addItem: (item) => {},
	removeItem: (id) => {},
});

export default CartContext;
