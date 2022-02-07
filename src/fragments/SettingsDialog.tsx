import React from 'react';
import {
	Button,
	Container, FormControlLabel,
	FormGroup,
	Grid,
	IconButton,
	Modal,
	Paper, Switch,
	TextField,
	Typography,
} from '@mui/material';
import { Settings } from '@mui/icons-material';
import DocumentStashInstance from '../models/DocumentStash';
import NotificationContext from './NotificationContext';

const style = {
	position: 'absolute' as 'absolute',
	p: 4,
};

export default function SettingsDialog() {
	const previousState = DocumentStashInstance.getLocalSettings();
	const [open, setOpen] = React.useState(false);
	const [isEnabled, setEnabled] = React.useState(previousState.sync);
	const [isSecure, setSecure] = React.useState(false);
	const [remote, setRemote] = React.useState(previousState.remoteAddress);
	const [username, setUsername] = React.useState(previousState.username);
	const [password, setPassword] = React.useState(previousState.password);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const saveSettings = (popup: {notify: (xs: string) => void}) => {
		DocumentStashInstance.setLocalSettings({
			sync: isEnabled,
			secure: isSecure,
			remoteAddress: remote,
			username: username,
			password: password,
		});
		popup.notify('Settings saved');
		handleClose();
	};

	return (<>
		<IconButton onClick={handleOpen} edge={'end'} size={'large'} color={'inherit'} aria-label={'settings'}>
			<Settings/>
		</IconButton>
		<Modal open={open} onClose={handleClose} sx={style}>
			<Container maxWidth={'md'}>
				<Paper sx={{padding: 2}}>
					<Grid container direction={'column'} spacing={4}>
						<Grid item>
							<Typography variant={'h5'}>
								Settings
							</Typography>
						</Grid>
						<Grid item>
							<FormGroup>
								<FormControlLabel
									control={<Switch checked={isEnabled} onChange={e => setEnabled(e.target.checked)}/>}
									label={'Enable sync'}/>
							</FormGroup>
						</Grid>
						<Grid item>
							<FormGroup>
								<FormControlLabel control={<Switch disabled={!isEnabled} checked={isSecure} onChange={e => setSecure(e.target.checked)} />} label={'Use secure connection'} />
							</FormGroup>
						</Grid>
						<Grid item>
							<TextField id={'input-remote'} label={'Remote Domain'}
									   placeholder={'my-couch-server.example'} value={remote}
									   onChange={e => setRemote(e.target.value)} disabled={!isEnabled} fullWidth/>
						</Grid>
						<Grid item>
							<TextField id={'input-username'} label={'Username'} disabled={!isEnabled} value={username}
									   onChange={e => setUsername(e.target.value)} fullWidth/>
						</Grid>
						<Grid item>
							<TextField id={'input-password'} label={'Password'} type={'password'} disabled={!isEnabled}
									   value={password} onChange={e => setPassword(e.target.value)} fullWidth/>
						</Grid>
						<Grid item>
							<Grid container spacing={2} direction={'row-reverse'}>
								<NotificationContext.Consumer>
									{value => <Button color={'primary'} onClick={() => saveSettings(value)}>
										<Typography>
											Save
										</Typography>
									</Button>}
								</NotificationContext.Consumer>
								<Button color={'secondary'} onClick={handleClose}>
									<Typography>
										Cancel
									</Typography>
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</Modal>
	</>);
}
