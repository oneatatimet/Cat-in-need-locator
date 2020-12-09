import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Header from '../../components/Header';

import * as s from './styles.modules.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChangePasswordForm from '../../components/ChangePasswordForm';

const drawerWidth = 240;

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

export default function Settings(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const [selectedIndex, setSelectedIndex] = React.useState(1);
	const [page, setPage] = React.useState(1);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
		setPage(index);
	};

	const currentUser = JSON.parse(localStorage.getItem('currentUser'));
	const isAdmin = currentUser.roleId === 1;
	console.log('isAdmin', isAdmin);
	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header open={open} handleDrawerOpen={handleDrawerOpen} title={'User Dashboard'} />

			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<div className={'settingsWrapper'}>
					<Paper elevation={3} className={'settingsLeft'}>
						<List component="nav" aria-label="secondary mailbox folder">
							<ListItem
								button
								selected={selectedIndex === 2}
								onClick={(event) => handleListItemClick(event, 2)}
							>
								<ListItemText primary="Change Password" />
							</ListItem>
						</List>
					</Paper>
					<Paper elevation={3} className={'settingsRight'}>
						{<ChangePasswordForm />}
					</Paper>
				</div>
			</main>
		</div>
	);
}
