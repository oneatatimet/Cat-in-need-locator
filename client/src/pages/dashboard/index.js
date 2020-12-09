import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Header from '../../components/Header';
import Sider from '../../components/Sider';
import Box from '@material-ui/core/Box';
import GoogleMap from '../../components/GoogleMap';
import AnimalFoundForm from '../../components/AnimalFoundForm';

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

export default function Dashboard(props) {
	return (
		<div>
			<Header />
			<Sider />
			<AnimalFoundForm />
			<GoogleMap />
			<Box mt={8}>
				<Copyright />
			</Box>
		</div>
	);
}
