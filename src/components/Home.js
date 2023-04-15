import { CartState } from "../context/Context";
import SingleProduct from "./SingleProduct";
import "./styles.css";
import Filters from "./Filters";

const Home = () => {
	const {
		state: { products },
		productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
	} = CartState();
	// console.log(products);
	// console.log(state.cart);

	const filterProducts = () => {
		var filteredProducts = products;
		if (sort) {
			filteredProducts = filteredProducts.sort((a, b) =>
				sort === "lowToHigh" ? a.price - b.price : b.price - a.price
			);
		}

		if (!byStock) {
			filteredProducts = filteredProducts.filter((prod) => prod.inStock);
		}

		if (byFastDelivery) {
			filteredProducts = filteredProducts.filter((prod) => prod.fastDelivery);
		}

		if (byRating) {
			filteredProducts = filteredProducts.filter(
				(prod) => prod.ratings >= byRating
			);
		}

		if (searchQuery) {
			filteredProducts = filteredProducts.filter((prod) =>
				prod.name.toLowerCase().includes(searchQuery)
			);
		}

		return filteredProducts;
	};

	return (
		<div className="home">
			<Filters />

			<div className="productContainer">
				{filterProducts().map((prod) => {
					return <SingleProduct prod={prod} key={prod.id} />;
				})}
			</div>
		</div>
	);
};

export default Home;
