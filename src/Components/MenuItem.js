import "../Styles/menuitem.css";
import CartContext from "../Store/CartContext";
import { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import veg from "../assets/veg.png";
import nonveg from "../assets/non-veg.png";

const MenuItem = (props) => {
	const itemAvailability = props.availability;
	const cartcontext = useContext(CartContext);
	const [amount, setamount] = useState(cartcontext.getAmount(props.id)); //Variable used to store the number of items added

	//conditions to display add on section and type of dish veg or non-veg
	const imageurl = props.itemtype === 1 ? nonveg : veg;
	const addons = props.addons.length === 0 ? false : true;

	//function adds item to cart array when user clicks the plus button
	const additemhandler = () => {
		setamount((amount) => amount + 1);
		cartcontext.addItem({
			id: props.id,
			name: props.name,
			price: props.price,
			amount: 1,
		});
	};

	//Function removes item from cart when user clicks the remove button
	const removeitemhandler = () => {
		if (amount === 0) {
			return;
		}
		setamount((amount) => amount - 1);
		cartcontext.removeItem(props.id);
	};

	return (
		<div className="menu-item-container">
			<div className="details-container">
				<div className="product-image">
					<img className="dish-type-logo" src={imageurl} alt="Dish Type" />
				</div>
				<div className="menu-details">
					<Typography variant="h6">{props.name}</Typography>
					<Typography variant="body2">{props.description}</Typography>
					<Typography variant="h6">${props.price}</Typography>
					{itemAvailability ? (
						<div>
							<div className="number">
								<span className="minus" onClick={removeitemhandler}>
									-
								</span>
								<span>{amount}</span>
								<span className="plus" onClick={additemhandler}>
									+
								</span>
							</div>
							{addons && (
								<Typography variant="caption" color="secondary" noWrap>
									Customisation availability
								</Typography>
							)}
						</div>
					) : (
						<Typography variant="caption" color="secondary">
							Not available
						</Typography>
					)}
				</div>
			</div>
			<div>
				<Typography variant="subtitle2">{props.calories}calories</Typography>
			</div>
			<img className="dish-image" src={props.imageurl} alt="Dish" />
		</div>
	);
};

export default MenuItem;
