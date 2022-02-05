import React from 'react';
import { Grid } from '@mui/material';
import ScratchBox from '../fragments/ScratchBox';

export default function LandingPage() {
	return (<>
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<ScratchBox />
			</Grid>
			<Grid item>
				<></>
			</Grid>
		</Grid>
	</>);
}
