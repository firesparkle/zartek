import MenuItem from "./MenuItem";

const CategoryDishes = (props) => {
	// List of dishes available under the particular category and passing the required data to MenuItem props
	const mealslist = props.dishes.map((meal, index) => (
		<MenuItem
			key={meal.dish_id}
			id={meal.dish_id}
			name={meal.dish_name}
			description={meal.dish_description}
			price={meal.dish_price}
			calories={meal.dish_calories}
			imageurl={meal.dish_image}
			item={meal}
			availability={meal.dish_Availability}
			addons={meal.addonCat}
			itemtype={meal.dish_Type}
		/>
	));

	return (
		<ul style={{ marginLeft: "20px", paddingInlineStart: "0px" }}>
			{mealslist}
		</ul>
	);
};

export default CategoryDishes;
