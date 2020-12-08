import React, { Component } from 'react';

import {
	Container,
	Navbar,
	NavbarBrand,
	Row,
	Jumbotron,
	InputGroup,
	InputGroupAddon,
	Button,
	FormGroup,
	Input,
	Col,
} from 'reactstrap';

//
import map from './map';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//
			cityList: [],
			newCityName: '',
			newDescription: '',
		};
	}

	getCityList = () => {
		fetch('/api/cities')
			.then((res) => res.json())
			.then((res) => {
				var cityList = res.map((r) => r.city);
				this.setState({ cityList });
			});
	};

	handleInputChange = (e) => {
		this.setState({ newCityName: e.target.value });
	};
	handleInputChange1 = (e) => {
		this.setState({ newDescription: e.target.value });
	};

	// handleAddDescription = () => {
	// 	console.log('called');
	// 	fetch('/api/description', {
	// 		method: 'post',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({ description: this.state.newDescription }),
	// 	}).then((res) => res.json());
	// };

	handleAddCat = () => {
		fetch('/api/cities', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(
				{ city: this.state.newCityName },
				{ description: this.state.newDescription }
			),
		})
			.then((res) => res.json())
			.then((res) => {
				this.getCityList();
				this.setState({ newCityName: '' });
			});
	};

	//

	handleChangeCity = (e) => {
		this.getWeather(e.target.value);
	};

	componentDidMount() {
		this.getCityList();
	}

	render() {
		return (
			<Container fluid className="centered">
				<Navbar dark color="dark">
					<NavbarBrand href="/"></NavbarBrand>
				</Navbar>
				<Row>
					<Col>
						<Jumbotron>
							<h1 className="display-4">Cat in need</h1>
							<p className="lead">Please fill in the cats information:</p>
							<FormGroup>
								<Input
									placeholder="City"
									value={this.state.newCityName}
									onChange={this.handleInputChange}
								/>
								<br />
								<Input
									placeholder="Description"
									value={this.state.newDescription}
									onChange={this.handleInputChange1}
								/>
								<br />

								<InputGroupAddon addonType="append">
									<Button color="primary" onClick={this.handleAddCat}>
										Add Cat
									</Button>
								</InputGroupAddon>
							</FormGroup>
						</Jumbotron>
					</Col>
				</Row>
				<Row></Row>
			</Container>
		);
	}
}

export default App;
