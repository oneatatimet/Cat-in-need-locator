import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import HowToRegOutlined from '@material-ui/icons/HowToRegOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { gql, useMutation, apolloClient } from '@apollo/client';
import jwt from 'jsonwebtoken';

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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`;

export default function SignIn(props) {
	const [email, setEmail] = useState();
	const classes = useStyles();
	const [password, setPassword] = useState();
	const [error, setError] = useState();
	const [login, { loading, error: graphQlError, data }] = useMutation(LOGIN);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login({
				variables: {
					email: email,
					password: password,
				},
			})
				.then((res) => {
					if (res.data.login) {
						let token = res.data.login.token;
						localStorage.setItem('authToken', token);
						console.log('here is the problem', token);
						let currentUser = jwt.verify(token, 'secret');
						localStorage.setItem('currentUser', JSON.stringify(currentUser));
						// props.history.push('/dashboard')
					}
				})
				.catch((e) => {
					console.log(e);
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
					Log in
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						value={password}
						fullWidth
						onChange={(e) => setPassword(e.target.value)}
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					{/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{loading ? 'Singing In' : 'Log In'}
					</Button>
					<Grid container>
						{/* <Grid item xs>
             
            </Grid> */}
						<Grid item>
							<Link
								onClick={(e) => {
									e.preventDefault();
									const { history } = props;
									history.push('/signup');
								}}
								variant="body2"
							>
								{"Don't have an account? Sign Up"}
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
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
