import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function AnimalFoundForm({ handleAnimalFormSubmit, clearValues }) {
	const [description, setDescription] = useState();
	const [address, setAddress] = useState('');
	const classes = useStyles();
	const [location, setLocation] = useState({
		name: '',
		lat: '',
		lng: '',
	});

	const [urgency, setUrgency] = useState(false);

	useEffect(() => {
		function resetFormValues() {
			setUrgency(false);
			setDescription('');
			setAddress('');
		}
		resetFormValues();
	}, [clearValues === true]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (localStorage.getItem('authToken')) {
			const currentUser = JSON.parse(localStorage.getItem('currentUser'));
			const values = {
				location: location,
				urgency: urgency,
				userId: currentUser.id,
				description: description,
				address: address,
			};
			await handleAnimalFormSubmit(values);
		}
	};

	const handleChange = (value) => {
		setAddress(value);
	};

	const handleSelect = (value) => {
		setAddress(value);
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => {
				setLocation({
					name: address,
					lat: latLng.lat,
					lng: latLng.lng,
				});
			})
			.catch((error) => console.error('Error', error));
	};

	const handleCheck = (e) => {
		console.log('handle check valye', e);
		setUrgency(!urgency);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Add Found Animal
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						multiline
						rowsMax={4}
						fullWidth
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						id="description"
						label="Description"
						name="description"
						autoComplete="description"
						autoFocus
					/>

					<PlacesAutoComplete value={address} onChange={handleChange} onSelect={handleSelect}>
						{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
							<div>
								<TextField
									variant="outlined"
									margin="normal"
									label="Location"
									required
									fullWidth
									{...getInputProps({
										placeholder: 'Search Location ...',
									})}
								/>
								<div className="autocomplete-dropdown-container">
									{loading && <div>Loading...</div>}
									{suggestions.map((suggestion) => {
										const className = suggestion.active
											? 'suggestion-item--active'
											: 'suggestion-item';
										// inline style for demonstration purpose
										const style = suggestion.active
											? { backgroundColor: '#fafafa', cursor: 'pointer' }
											: { backgroundColor: '#ffffff', cursor: 'pointer' };
										return (
											<div
												{...getSuggestionItemProps(suggestion, {
													className,
													style,
												})}
											>
												<span>{suggestion.description}</span>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</PlacesAutoComplete>

					<FormControlLabel
						value="urgency"
						control={<Checkbox color="primary" />}
						label="Urgency"
						labelPlacement="end"
						onChange={handleCheck}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						ADD ANIMAL
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default AnimalFoundForm;
