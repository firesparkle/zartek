import Header from "./Components/Header";
import Menu from "./Components/Menu";
import CartProvider from "./Store/CartProvider";

function App() {
	return (
		<CartProvider>
			<Header />
			<Menu />
		</CartProvider>
	);
}

export default App;
