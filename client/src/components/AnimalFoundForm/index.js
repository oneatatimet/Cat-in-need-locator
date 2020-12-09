import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PlacesAutoComplete from 'react-places-autocomplete';

function AnimalFoundForm() {
	const [description, setDescription] = useState();
	const [address, setAddress] = useState('');

	const handleSubmit = async (e) => {};

	const handleChange = (value) => {
		setAddress(value);
	};

	const handleSelect = (value) => {
		setAddress(value);
	};

	return (
		<Container component="main" maxWidth="xs">
			<div>
				<Typography component="h1" variant="h5">
					Add Found Animal
				</Typography>
				<form onSubmit={handleSubmit}>
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

					<Button type="submit" fullWidth variant="contained" color="primary">
						ADD ANIMAL
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default AnimalFoundForm;
