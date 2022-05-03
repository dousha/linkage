import React from 'react';
import { Grid, Skeleton, Typography } from '@mui/material';
import { Document } from '../models/Document';
import SummaryCard from './components/SummaryCard';
import { Masonry } from '@mui/lab';
import { useTranslation } from 'react-i18next';

export interface CardStashProps {
	isBusy: boolean;
	isEmpty: boolean;
	documents: Document[];

	setEditorId: (x: string) => void;
	deleteDocument: (x: string) => void;
}

export default function CardStash(props: CardStashProps) {
	const {t} = useTranslation();

	if (props.isBusy) {
		return <>
			<Skeleton variant={'text'}/>
		</>;
	} else {
		if (props.isEmpty) {
			return <Grid container>
				<Grid item xs/>
				<Grid item xs>
					<Typography>
						{t('textNoDocument')}
					</Typography>
				</Grid>
				<Grid item xs/>
			</Grid>;
		} else {
			return <>
				<Masonry columns={3} spacing={1}>
					{props.documents.map(doc => <SummaryCard key={doc._id} document={doc}
															 tryLoadEntry={props.setEditorId}
															 tryDeleteEntry={props.deleteDocument}/>)}
				</Masonry>
			</>;
		}
	}
}
