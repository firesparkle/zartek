import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function CategoriesNavigation(props) {
	//mapping the list of categories
	const categoriesList = props.categories.map((category, index) => (
		<Tab key={index} label={category} value={index} sx={{ flexGrow: 1 }} />
	));

	const [value, setValue] = React.useState(0);

	//function to handle the change of category
	const handleChange = (event, newValue) => {
		setValue(newValue);
		props.setDishes(newValue);
	};

	return (
		<Box
			sx={{
				width: "100%",
				bgcolor: "background.paper",
				borderBottom: 1,
				borderColor: "divider",
				justifyContent: "space-around",
			}}
		>
			<Tabs
				value={value}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="auto"
				textColor="secondary"
				indicatorColor="secondary"
				aria-label="scrollable auto tabs example"
			>
				{categoriesList}
			</Tabs>
		</Box>
	);
}
