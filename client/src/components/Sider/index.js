import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems } from '../../components/listItem';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

const drawerWidth = 240;

const Sider = ({ open, handleDrawerClose, currPage }) => {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	let history = useHistory();
	const handleListItemClick = (event, index, route) => {
		setSelectedIndex(index);
		history.push(route);
	};
	return (
		<div>
			<Drawer
				style={{ height: '100%' }}
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<Link to={'dashboard'} style={{ color: 'grey', textDecoration: 'none' }}>
						<Typography variant="h5" color="primary">
							Animals in need
						</Typography>
					</Link>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					{
						<MainListItems
							handleListItemClick={handleListItemClick}
							setSelectedIndex={setSelectedIndex}
							selectedIndex={selectedIndex}
							currPage={currPage}
						/>
					}
				</List>
			</Drawer>
		</div>
	);
};

export default Sider;
