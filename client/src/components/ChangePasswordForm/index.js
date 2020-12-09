import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';

import { gql, useMutation, apolloClient } from '@apollo/client';
import jwt from 'jsonwebtoken';

const CHANGE_PASSWORD = gql`
	mutation changePassword($userId: Int!, $currentPassword: String!, $newPassword: String!) {
		changePassword(userId: $userId, currentPassword: $currentPassword, newPassword: $newPassword)
	}
`;

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function ChangePasswordForm() {
	const [currentPassword, setCurrentPassword] = useState();
	const [newPassword, setNewPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [changePassword, { loading, error: graphQlError, data }] = useMutation(CHANGE_PASSWORD);

	const classes = useStyles();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (localStorage.getItem('authToken')) {
				let currentUser = JSON.parse(localStorage.getItem('currentUser'));
				await changePassword({
					variables: {
						userId: currentUser.id,
						currentPassword: currentPassword,
						newPassword: newPassword,
					},
				})
					.then((res) => {
						if (res.data.changePassword) {
							console.log('Password Changed', res.data.changePassword);
						}
					})
					.catch(console.log);
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Change Password
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						id="currentPassword"
						label="Current Password"
						name="currentPassword"
						autoComplete="currentPassword"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						value={newPassword}
						fullWidth
						onChange={(e) => setNewPassword(e.target.value)}
						name="newPassword"
						label="New Password"
						type="password"
						id="newPassword"
						autoComplete="current-password"
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Update
					</Button>
					<Grid>
						{graphQlError && (
							<Alert severity="error">
								{graphQlError.graphQLErrors.map(({ message }, i) => (
									<span key={i}>{message}</span>
								))}
							</Alert>
						)}
						{data && <Alert severity="success">{data.changePassword}</Alert>}
					</Grid>
				</form>
			</div>
		</Container>
	);
}
