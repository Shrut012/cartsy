import {
	Badge,
	Button,
	Container,
	Dropdown,
	FormControl,
	Navbar,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";
import "./styles.css";
import { useEffect, useState } from "react";

const Header = () => {
	const {
		state: { cart },
		dispatch,
		productDispatch,
	} = CartState();

	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<Navbar sticky="top" bg="dark" variant="dark" style={{ height: 80 }}>
			<Container>
				<Navbar.Brand>
					<NavLink to="/" style={{ fontWeight: "bolder", fontSize: "1.6rem" }}>
						CARTSY
					</NavLink>
				</Navbar.Brand>

				<Navbar.Text className="search">
					<FormControl
						placeholder="Search a product"
						style={{ width: 500 }}
						className="m-auto"
						onChange={(e) => {
							productDispatch({
								type: "FILTER_BY_SEARCH",
								payload: e.target.value,
							});
						}}
					></FormControl>
				</Navbar.Text>

				<Dropdown
					align={{ sm: "right" }}
					className="cart_dropdown"
					// style={{ display: screenWidth < 600 ? "none" : "block" }}
				>
					<Dropdown.Toggle
						variant="success"
						disabled={screenWidth < 600}
						className="custom-toggle"
					>
						<FaShoppingCart color="white" fontSize="25px" />
						<Badge bg="none" fontSize="25px">
							{cart.length}
						</Badge>
					</Dropdown.Toggle>

					<Dropdown.Menu style={{ minWidth: 370 }}>
						{cart.length > 0 ? (
							<>
								{cart.map((prod) => (
									<span className="cartItem" key={prod.id}>
										<img
											src={prod.image}
											className="cartItemImg"
											alt={prod.name}
										/>
										<div className="cartItemDetail">
											<span>{prod.name}</span>
											<span>₹ {prod.price.split(".")[0]}</span>
										</div>
										<AiFillDelete
											fontSize="20px"
											style={{ cursor: "pointer" }}
											onClick={() =>
												dispatch({
													type: "REMOVE_FROM_CART",
													payload: prod,
												})
											}
										/>
									</span>
								))}
								<Link to="/cart">
									<Button style={{ width: "95%", margin: "0 10px" }}>
										Go To Cart
									</Button>
								</Link>
							</>
						) : (
							<span style={{ padding: 10 }}>Cart is empty!</span>
						)}
					</Dropdown.Menu>
				</Dropdown>
			</Container>
		</Navbar>
	);
};

export default Header;
