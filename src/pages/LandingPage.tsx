import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import ScratchBox from '../fragments/ScratchBox';
import CardStash from '../fragments/CardStash';
import DocumentStashInstance from '../models/DocumentStash';

export default function LandingPage() {
	const [editingId, setEditingId] = useState('');

	return (<>
		<Container maxWidth={'lg'}>
			<Grid container spacing={2} direction={'column'}>
				<Grid item>
					<ScratchBox editingId={editingId} setEditingId={setEditingId}/>
				</Grid>
				<Grid item>
					<CardStash setEditorId={setEditingId}/>
				</Grid>
			</Grid>
		</Container></>);
}
