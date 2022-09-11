import Badge from "@mui/material/Badge";
import CartIcon from "./CartIcon";
import "../Styles/header.css";
import CartContext from "../Store/CartContext";
import { useContext } from "react";

const Header = (props) => {
	const cartContext = useContext(CartContext);

	return (
		<div className="header-container">
			<h3>UNI Resto Cafe</h3>
			<div className="cart-button" onClick={props.onclick}>
				{" "}
				<p className="order-title">My Orders</p>
				<Badge
					badgeContent={cartContext.numberOfItems}
					color="secondary"
					showZero
				>
					<div className="icon">
						<CartIcon />{" "}
					</div>
				</Badge>
			</div>
		</div>
	);
};

export default Header;
