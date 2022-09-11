import { useEffect, useState } from "react";
import CategoriesNavigation from "./CategoriesNavigation";
import CategoryDishes from "./CategoryDishes";
import "../Styles/Menu.css";

const Menu = () => {
	const [categories, setCategories] = useState([]);
	const [dishes, setDishes] = useState([]);
	const [selectedDishes, setSelectedDishes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();

	// fetches data and collects the required data needed
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099"
			);

			if (!response.ok) {
				throw new Error("data error");
			}

			const responseData = await response.json();

			const requiredData = responseData[0].table_menu_list;
			console.log(responseData[0].table_menu_list);
			const menuCategories = requiredData.map((item) => item.menu_category);
			const menuDishes = requiredData.map((item) => item.category_dishes);
			setCategories(menuCategories);
			setDishes(menuDishes);
			setSelectedDishes(menuDishes[0]);
			setIsLoading(false);
		};
		fetchData().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	const setDishesHandler = (index) => {
		setSelectedDishes(dishes[index]);
	};

	//function to handle loading state
	if (isLoading) {
		return (
			<section className="MealsLoading">
				<p>Loading...</p>
			</section>
		);
	}

	//function to handle error state
	if (httpError) {
		return (
			<section className="MealsError">
				<p>{httpError}</p>
			</section>
		);
	}

	return (
		<div>
			<CategoriesNavigation
				categories={categories}
				setDishes={setDishesHandler}
			></CategoriesNavigation>
			<CategoryDishes dishes={selectedDishes}></CategoryDishes>
		</div>
	);
};

export default Menu;
