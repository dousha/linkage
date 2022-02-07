import React, { useEffect, useState } from 'react';
import DocumentStashInstance from '../models/DocumentStash';
import { Grid, Skeleton, Typography } from '@mui/material';
import { Document } from '../models/Document';
import SummaryCard from './SummaryCard';
import { Masonry } from '@mui/lab';

export interface CardStashProps {
	setEditorId: (x: string) => void;
}

export default function CardStash(props: CardStashProps) {
	const [isBusy, setBusy] = useState(true);
	const [isEmpty, setEmpty] = useState(true);
	const [documents, setDocuments] = useState<Document[]>([]);

	useEffect(() => {
		DocumentStashInstance.init().then(() => {
			DocumentStashInstance.isDatabaseEmpty().then(result => {
				setEmpty(result);
				if (result) {
					setBusy(false);
					setDocuments([]);
				} else {
					DocumentStashInstance.getRecentDocuments().then(xs => {
						setDocuments(xs);
						console.log(xs);
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
	}, [isBusy, isEmpty]);

	if (isBusy) {
		return <>
			<Skeleton variant={'text'}/>
		</>;
	} else {
		if (isEmpty) {
			return <Grid container>
				<Grid item xs/>
				<Grid item xs>
					<Typography>
						No document
					</Typography>
				</Grid>
				<Grid item xs/>
			</Grid>;
		} else {
			return <>
				<Masonry columns={3} spacing={1}>
					{documents.map(doc => <SummaryCard key={doc._id} document={doc} setEditorId={props.setEditorId} />)}
				</Masonry>
			</>;
		}
	}
}
