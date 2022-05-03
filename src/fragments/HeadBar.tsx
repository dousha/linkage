import { AppBar, Box, CircularProgress, IconButton, Toolbar, Typography } from '@mui/material';
import SettingsDialog from './dialogs/SettingsDialog';
import React from 'react';
import NetworkStateContext from './NetworkStateContext';
import { Refresh } from '@mui/icons-material';
import DocumentStashInstance from '../models/DocumentStash';
import NotificationContext from './NotificationContext';
import { runAtLeastFor } from '../util/Utils';

import { useTranslation } from 'react-i18next';

export default function HeadBar() {
	const {t} = useTranslation();

	return <NetworkStateContext.Consumer>
		{
			value => <AppBar position={'static'}>
				<Toolbar>
					<Typography variant={'h6'} component={'div'}>
						{t('appName')}
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
												x.notify(t('toastSyncSuccess'));
											}).catch(e => {
												console.error(e);
												x.notify(t('toastSyncFailed'));
											}).finally(() => value.setState(0));
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
