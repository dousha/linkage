import { AppBar, Box, CircularProgress, IconButton, Toolbar, Typography } from '@mui/material';
import SettingsDialog from './SettingsDialog';
import React from 'react';
import NetworkStateContext from './NetworkStateContext';
import { Refresh } from '@mui/icons-material';
import DocumentStashInstance from '../models/DocumentStash';
import NotificationContext from './NotificationContext';
import { runAtLeastFor } from '../util/Utils';

export default function HeadBar() {
	return <NetworkStateContext.Consumer>
		{
			value => <AppBar position={'static'}>
				<Toolbar>
					<Typography variant={'h6'} component={'div'}>
						Linkage
					</Typography>
					<Box sx={{width: '1rem'}}/>
					{
						DocumentStashInstance.getLocalSettings().sync ? (
						value.state > 0 ? (value.state === 1 ? <CircularProgress color={'inherit'}/> : null) : (
							<NotificationContext.Consumer>
								{
									x => <IconButton color={'inherit'} onClick={() => {
										value.setState(1);
										runAtLeastFor(800, () => DocumentStashInstance.sync()).then(() => {
											value.setState(0);
											x.notify('Synced');
										});
									}
									}><Refresh/></IconButton>
								}
							</NotificationContext.Consumer>
							)
						) : null
					}
					<Box sx={{flexGrow: 1}}/>
					<SettingsDialog/>
				</Toolbar>
			</AppBar>
		}
	</NetworkStateContext.Consumer>;
}
