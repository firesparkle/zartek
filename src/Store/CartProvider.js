import { useReducer } from "react";
import { useState } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};
//function which handlers add and remove from cart
const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const newAmount = state.totalAmount + action.item.price;
		const existingItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingItem = state.items[existingItemIndex];

		let updatedItems = [];
		if (existingItem) {
			updatedItems = [...state.items];
			updatedItems[existingItemIndex] = {
				...existingItem,
				numberOfItems: existingItem.numberOfItems + 1,
			};
		} else {
			updatedItems = [...state.items];
			updatedItems.push({ ...action.item, numberOfItems: 1 });
		}
		return {
			items: updatedItems,
			totalAmount: newAmount,
		};
	}

	if (action.type === "REMOVE") {
		const itemToBeRemoveIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const itemToBeRemoved = state.items[itemToBeRemoveIndex];
		const updatedAmount = state.totalAmount - itemToBeRemoved.price;

		let updatedCart = [];
		if (itemToBeRemoved.numberOfItems === 1) {
			updatedCart = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = {
				...itemToBeRemoved,
				numberOfItems: itemToBeRemoved.numberOfItems - 1,
			};
			updatedCart = [...state.items];
			updatedCart[itemToBeRemoveIndex] = updatedItem;
		}

		return {
			items: updatedCart,
			totalAmount: updatedAmount,
		};
	}

	return defaultCartState;
};

const CartProvider = (props) => {
	const [cart, dispatch] = useReducer(cartReducer, defaultCartState);
	const [numberOfItems, setNumberOfItems] = useState(0);

	const addItemHandler = (item) => {
		dispatch({ type: "ADD", item: item });
		setNumberOfItems((number) => number + 1);
		console.log(numberOfItems);
	};

	const removeItemHandler = (id) => {
		dispatch({ type: "REMOVE", id: id });
		setNumberOfItems((number) => number - 1);
	};
	//function which returns the Number of items stored for each type of dish
	const getItemAmount = (id) => {
		const itemToBeFoundIndex = cart.items.findIndex((item) => item.id === id);
		const itemToBeFound = cart.items[itemToBeFoundIndex];
		if (itemToBeFound) {
			return itemToBeFound.numberOfItems;
		}

		return 0;
	};

	const cartContext = {
		item: cart.items,
		numberOfItems: numberOfItems,
		totalAmount: cart.totalAmount,
		addItem: addItemHandler,
		removeItem: removeItemHandler,
		getAmount: getItemAmount,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
