import { Snackbar } from '@mui/material';
import React from 'react';
import NotificationContext from './NotificationContext';

export default function NotificationBox() {
	return (<>
		<NotificationContext.Consumer>
			{
				value => <Snackbar open={value.open} message={value.msg} autoHideDuration={3000} onClose={() => value.close()}/>
			}
		</NotificationContext.Consumer>
	</>);
}
