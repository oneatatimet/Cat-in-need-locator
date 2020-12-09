import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function Dashboard(props) {
	function Copyright() {
		return (
			<Typography variant="body2" color="textSecondary" align="center">
				{'Copyright © '}
				<Link color="inherit" href="https://material-ui.com/">
					Your Website
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		);
	}

	return (
		<div>
			<h1>Dashboard</h1>
			<Box mt={8}>
				<Copyright />
			</Box>
		</div>
	);
}
