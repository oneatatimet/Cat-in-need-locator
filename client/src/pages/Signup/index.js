import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import HowToRegOutlined from '@material-ui/icons/HowToRegOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { gql, useMutation } from '@apollo/client';
import Snackbar from '@material-ui/core/Snackbar';

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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const CREATE_USER = gql`
	mutation createUser($name: String!, $email: String!, $password: String!) {
		createUser(name: $name, email: $email, password: $password)
	}
`;

export default function SignUp(props) {
	const classes = useStyles();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [open, setOpen] = React.useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	const [createUser, { error: graphQlError }] = useMutation(CREATE_USER);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { history } = props;
		let name = firstName + ' ' + lastName;
		try {
			await createUser({
				variables: {
					name: name,
					email: email,
					password: password,
				},
			}).then((res) => {
				if (res.data.createUser) {
					setOpen(true);
					setTimeout(() => {
						history.push('/login');
					}, 3000);
				}
			});
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<HowToRegOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link
								onClick={(e) => {
									e.preventDefault();
									const { history } = props;
									console.log('Handle submit values', props);
									history.push('/login');
								}}
								variant="body2"
							>
								Already have an account? Log in
							</Link>
						</Grid>
					</Grid>
					<Grid>
						{graphQlError && (
							<Alert severity="error">
								{graphQlError.graphQLErrors.map(({ message }, i) => (
									<span key={i}>{message}</span>
								))}
							</Alert>
						)}
					</Grid>
				</form>
				<Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="success">
						Registered Successfully. Please login to continue!
					</Alert>
				</Snackbar>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
