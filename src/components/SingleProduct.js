import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import "./styles.css";
import { CartState } from "../context/Context";

const SingleProduct = ({ prod }) => {
	const {
		state: { cart },
		dispatch,
	} = CartState(); //useReducer

	return (
		<div className="products">
			<Card>
				<Card.Img variant="top" src={prod.image} alt={prod.name} />
				<Card.Body>
					<Card.Title>{prod.name}</Card.Title>
					<Card.Subtitle style={{ paddingBottom: 10 }}>
						<span>₹ {prod.price.split(".")[0]} </span>
						{prod.fastDelivery ? (
							<div>Fast Delivery</div>
						) : (
							<div>4 days standard delivery</div>
						)}
						<Rating rating={prod.ratings} />
					</Card.Subtitle>

					{/* if in cart state then add functionality to remove from cart */}
					{cart.some((p) => p.id === prod.id) ? (
						<Button
							variant="danger"
							onClick={() =>
								dispatch({
									type: "REMOVE_FROM_CART",
									payload: prod,
								})
							}
						>
							Remove from cart
						</Button>
					) : (
						<Button
							disabled={!prod.inStock}
							onClick={() =>
								dispatch({
									type: "ADD_TO_CART",
									payload: prod,
								})
							}
						>
							{prod.inStock ? "Add to cart" : "Out of Stock"}
						</Button>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};

export default SingleProduct;
