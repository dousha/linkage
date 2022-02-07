import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, styled, TextField, Tooltip, Typography } from '@mui/material';
import { Book, Clear, Edit } from '@mui/icons-material';
import { commitInput } from '../logic/InputParser';
import { runAtLeastFor } from '../util/Utils';
import DocumentStashInstance from '../models/DocumentStash';

const MonospacedEditor = styled(TextField)({
	'& .MuiInputBase-input': {
		fontFamily: [
			'monospace',
		],
	},
});

export interface ScratchBoxProps {
	editingId: string;

	setEditingId: (x: string) => void;
}

export default function ScratchBox(props: ScratchBoxProps) {
	const [text, setText] = useState('');
	const [canCommit, setCanCommit] = useState(false);
	const [isCommitting, setCommitting] = useState(false);

	useEffect(() => {
		if (props.editingId) {
			setCommitting(true);
			DocumentStashInstance.getDocument(props.editingId).then(doc => {
				setText(doc.value);
			})
				.catch(console.error)
				.finally(() => {
					setCommitting(false);
				});
		} else {
			setText('');
		}
	}, [props.editingId]);

	return (<Grid container direction={'column'} spacing={0}>
		<Grid item>
			<MonospacedEditor fullWidth multiline margin={'normal'} disabled={isCommitting} minRows={3}
							  placeholder={'Write anything'} value={text} onChange={e => {
				setText(e.target.value);
				if (e.target.value.length > 0) {
					setCanCommit(true);
				} else {
					setCanCommit(false);
				}
			}}/>
		</Grid>
		<Grid item>
			<Grid container direction={'row-reverse'} spacing={1} alignItems={'center'}>
				<Grid item>
					<Button variant={'contained'} disabled={isCommitting || !canCommit} onClick={() => {
						setCommitting(true);
						runAtLeastFor(800, () => commitInput(text, props.editingId))
							.then(v => {
								if (typeof v === 'string') {
									props.setEditingId(v);
								} else {
									// document query result
								}
							})
							.catch(e => {
								console.log(e);
							})
							.finally(() => setCommitting(false));
					}}>
						<Typography>
							Commit
						</Typography>
					</Button>
				</Grid>
				<Grid item>
					<Tooltip title={'Open editor'}>
						<IconButton>
							<Edit/>
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item xs>
					<Grid container alignItems={'center'}>
						<Grid item>
							<Typography>Document ID:&nbsp;</Typography>
						</Grid>
						<Grid item>
							<Typography>{props.editingId.length > 0 ? props.editingId : '(new document)'}</Typography>
						</Grid>
						<Grid item>
							{
								props.editingId.length > 0 ?
									<IconButton onClick={() => {setText(''); props.setEditingId('');}}>
										<Clear/>
									</IconButton> : null
							}
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Tooltip title={'Manual'}>
						<IconButton>
							<Book/>
						</IconButton>
					</Tooltip>
				</Grid>
			</Grid>
		</Grid>
	</Grid>);
}
