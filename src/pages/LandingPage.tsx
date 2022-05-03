import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import ScratchBox from '../fragments/ScratchBox';
import CardStash from '../fragments/CardStash';
import { Document } from '../models/Document';
import DocumentStashInstance from '../models/DocumentStash';

export default function LandingPage() {
	const [editingId, setEditingId] = useState('');
	const [isBusy, setBusy] = useState(true);
	const [isEmpty, setEmpty] = useState(true);
	const [documents, setDocuments] = useState<Document[]>([]);

	const loadRecentDocuments = () => {
		DocumentStashInstance.init().then(() => {
			DocumentStashInstance.isDatabaseEmpty().then(result => {
				setEmpty(result);
				if (result) {
					setBusy(false);
					setDocuments([]);
				} else {
					DocumentStashInstance.getRecentDocuments().then(xs => {
						setDocuments(xs);
					})
						.catch(console.log)
						.finally(() => {
							setBusy(false);
						});
				}
			}).catch(e => {
				console.log(e);
				setBusy(false);
				setEmpty(true);
			});
		});
	};

	useEffect(() => {
		loadRecentDocuments();
	}, [isBusy, isEmpty, editingId]);

	const deleteDocument = (id: string) => {
		setBusy(true);
		DocumentStashInstance.init().then(() => {
			DocumentStashInstance.deleteDocument(id).then(() => {
				loadRecentDocuments();
			});
		});
	};

	return (<>
		<Container maxWidth={'lg'}>
			<Grid container spacing={2} direction={'column'}>
				<Grid item>
					<ScratchBox editingId={editingId} setEditingId={setEditingId}/>
				</Grid>
				<Grid item>
					<CardStash isBusy={isBusy} isEmpty={isEmpty} documents={documents} setEditorId={setEditingId}
							   deleteDocument={deleteDocument}/>
				</Grid>
			</Grid>
		</Container></>);
}
