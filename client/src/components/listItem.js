import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

export const MainListItems = ({ currPage }) => {
	return (
		<div style={{ padding: '2rem 0' }}>
			<Link to="settings" style={{ color: 'grey', textDecoration: 'none' }}>
				<ListItem button selected={currPage == 'settings'}>
					<ListItemIcon>
						<SettingsIcon color={currPage == 'settings' ? 'primary' : ' secondary'} />
					</ListItemIcon>
					<ListItemText color="primary">
						<Typography color={currPage == 'settings' ? 'primary' : 'textSecondary'}>
							Settings
						</Typography>
					</ListItemText>
				</ListItem>
			</Link>
		</div>
	);
};
