import { Card, CardActions, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Document } from '../models/Document';
import { Edit, History, Today } from '@mui/icons-material';

export interface SummaryCardProps {
	document: Document;

	setEditorId: (x: string) => void;
}

export default function SummaryCard(props: SummaryCardProps) {
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
						<Grid container spacing={1}>
							<Grid item>
								<Tooltip title={'Last edit'}>
									<Today/>
								</Tooltip>
							</Grid>
							<Grid item>
								<Typography>{(new Date(props.document.updateTime)).toLocaleString()}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<Grid container direction={'row-reverse'}>
					<Grid item>
						<IconButton onClick={() => props.setEditorId(props.document._id)}>
							<Edit/>
						</IconButton>
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	</>;
}
