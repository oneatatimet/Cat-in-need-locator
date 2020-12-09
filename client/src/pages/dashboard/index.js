import React, { useState, useEffect, Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Header from '../../components/Header';
import Sider from '../../components/Sider';
import GoogleMap from '../../components/GoogleMap';
import AnimalFoundForm from '../../components/AnimalFoundForm';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Animals in need
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 100,
	},
}));

const CREATE_ANIMAL_FOUND = gql`
	mutation createAnimalFound(
		$description: String
		$locationName: String
		$lat: String
		$lng: String
		$userId: Int
	) {
		createAnimalFound(
			description: $description
			locationName: $locationName
			lat: $lat
			lng: $lng
			userId: $userId
		)
	}
`;
const GET_ANIMALS_FOUND = gql`
	query getAnimalsFound {
		getAnimalsFound {
			id
			description
			locationName
			lat
			lng
			userId
		}
	}
`;

export default function Dashboard(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [clearValues, setClearValues] = React.useState(false);
	const [userLat, setUserLat] = useState('');
	const [userLng, setUserLng] = useState('');

	const [createAnimalFound, { loading, error: graphQlError, data }] = useMutation(
		CREATE_ANIMAL_FOUND
	);
	const { loading: loadingAnimals, error: getAnimalsError, data: animalsData } = useQuery(
		GET_ANIMALS_FOUND
	);

	const submitAnimalForm = async (values) => {
		try {
			if (localStorage.getItem('authToken')) {
				await createAnimalFound({
					variables: {
						userId: values.userId,
						description: values.description,
						locationName: values.address,
						lat: values.location.lat.toString(),
						lng: values.location.lng.toString(),
					},
				})
					.then((res) => {
						if (res.data.createAnimalFound) {
							console.log('Animal Found', res.data.createAnimalFound);
							setClearValues(true);
						}
					})
					.catch(console.log);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const setCurrentUserLocation = () => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setUserLat(position.coords.latitude);
			setUserLng(position.coords.longitude);
		});
	};

	console.log('animals data', animalsData);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header open={open} handleDrawerOpen={handleDrawerOpen} title={'Admin Dashboard'} />
			<Sider open={open} handleDrawerClose={handleDrawerClose} />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container className={classes.container}>
					<Grid container>
						<Grid container item xs={12} sm={4}>
							<Paper elevation={3}>
								<AnimalFoundForm
									handleAnimalFormSubmit={submitAnimalForm}
									clearValues={clearValues}
								/>
								<Grid>
									{graphQlError && (
										<Alert severity="error">
											{graphQlError.graphQLErrors.map(({ message }, i) => (
												<span key={i}>{message}</span>
											))}
										</Alert>
									)}
									{data && <Alert severity="success">{data.createAnimalFound}</Alert>}
								</Grid>
							</Paper>
						</Grid>
						<Grid container item xs={12} sm={8}>
							{animalsData && animalsData.getAnimalsFound !== undefined && (
								<GoogleMap
									animalsFoundList={animalsData.getAnimalsFound}
									userLat={userLat}
									userLng={userLng}
								/>
							)}
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
	);
}
