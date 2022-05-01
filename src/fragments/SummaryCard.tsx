import { Card, CardActions, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Document } from '../models/Document';
import { Cancel, Check, Delete, Edit, Link, Share } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const moment = require('moment/min/moment-with-locales');

export interface SummaryCardProps {
	document: Document;

	tryLoadEntry: (x: string) => void;
	tryDeleteEntry: (x: string) => void;
}

export default function SummaryCard(props: SummaryCardProps) {
	const {t, i18n} = useTranslation();
	const [isDeleting, setDeleting] = useState(false);

	return <>
		<Card>
			<CardContent>
				<Grid container direction={'column'} alignItems={'flex-start'} spacing={1}>
					<Grid item>
						<Typography>
							{props.document.value}
						</Typography>
					</Grid>
					<Grid item>
						<Grid item>
							<Tooltip title={new Date(props.document.updateTime).toLocaleString()}>
								<Typography
									mx={{color: 'gray'}}>{`${t('textLastEdit')}${moment(props.document.updateTime).locale(i18n.language).fromNow()}`}</Typography>
							</Tooltip>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<Grid container direction={'row-reverse'}>
					{isDeleting ? (<></>) : (<>
						<Grid item>
							<Tooltip title={t('tooltipEdit')}>
								<IconButton onClick={() => props.tryLoadEntry(props.document._id)}>
									<Edit/>
								</IconButton>
							</Tooltip>
						</Grid>
						<Grid item>
							<Tooltip title={t('tooltipCreateReference')}>
								<IconButton>
									<Link/>
								</IconButton>
							</Tooltip>
						</Grid>
						<Grid item>
							<Tooltip title={t('tooltipListReferences')}>
								<IconButton>
									<Share/>
								</IconButton>
							</Tooltip>
						</Grid>
						<Grid item xs/>
					</>)}
					{isDeleting ? (<>
							<Grid item>
								<Tooltip title={t('tooltipDeleteConfirm')}>
									<IconButton onClick={() => {
										setDeleting(false);
										props.tryDeleteEntry(props.document._id);
									}}>
										<Check/>
									</IconButton>
								</Tooltip>
							</Grid>
							<Grid item xs/>
							<Grid item>
								<Tooltip title={t('tooltipDeleteCancel')}>
									<IconButton onClick={() => {
										setDeleting(false);
									}}>
										<Cancel/>
									</IconButton>
								</Tooltip>
							</Grid>
						</>
					) : (
						<Grid item>
							<Tooltip title={t('tooltipDelete')}>
								<IconButton onClick={() => {
									setDeleting(true);
								}}>
									<Delete/>
								</IconButton>
							</Tooltip>
						</Grid>
					)
					}
				</Grid>
			</CardActions>
		</Card>
	</>;
}
