import { Card, CardActions, CardContent, Grid, IconButton, Skeleton, Tooltip, Typography } from '@mui/material';
import { compileDocument, Document } from '../../models/Document';
import { Cancel, Check, Delete, Edit, Link, OpenInNew, Share } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const moment = require('moment/min/moment-with-locales');

export interface SummaryCardProps {
	document: Document;

	tryLoadEntry: (x: string) => void;
	tryDeleteEntry: (x: string) => void;
}

export default function SummaryCard(props: SummaryCardProps) {
	const {t, i18n} = useTranslation();
	const [isDeleting, setDeleting] = useState(false);
	const [isRendering, setRendering] = useState(true);
	const [isRenderSuccessful, setRenderSuccessful] = useState(true);
	const [renderResult, setRenderResult] = useState(<></>);
	const [toolStrip, setToolStrip] = useState(<></>);

	useEffect(() => {
		compileDocument(props.document).then(doc => {
			setToolStrip(doc.renderToolStrip(null));
			doc.renderSummary(null).then(result => {
				setRenderResult(result);
				setRenderSuccessful(true);
			}).catch(e => {
				setRenderSuccessful(false);
			}).finally(() => {
				setRendering(false);
			});
		}).catch(e => {
			setRendering(false);
			setRenderSuccessful(false);
		});
	}, [isRendering, isRenderSuccessful, props.document]);

	return <>
		<Card>
			<CardContent>
				<Grid container direction={'column'} alignItems={'flex-start'} spacing={1}>
					<Grid item>
						{isRendering ? (<Skeleton/>) : (isRenderSuccessful ? renderResult : (<>
							<Typography>RenderError</Typography></>))}
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
							<Tooltip title={t('tooltipOpen')}>
								<IconButton onClick={() => {
								}}>
									<OpenInNew/>
								</IconButton>
							</Tooltip>
						</Grid>
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
						{toolStrip}
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
