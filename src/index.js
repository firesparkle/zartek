import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//changing the secondary color to red
const theme = createTheme({
	palette: {
		secondary: {
			main: "#E33E7F",
		},
	},
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>
);
