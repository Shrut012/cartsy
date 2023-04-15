import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Cart from "./components/Cart.js";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
