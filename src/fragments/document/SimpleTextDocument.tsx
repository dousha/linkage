import React from 'react';
import { DeserializedDocument, Document } from '../../models/Document';
import { Grid, Typography } from '@mui/material';

export class SimpleTextDocument implements DeserializedDocument {
	constructor(doc: Document) {
		this.source = doc;
	}

	async render(): Promise<JSX.Element> {
		return <>
			<Typography>{this.source.value}</Typography>
		</>;
	}

	async renderSummary(): Promise<JSX.Element> {
		const paragraphs = this.source.value.split('\n\n');
		const firstParagraph = paragraphs[0];
		if (firstParagraph) {
			let content;
			if (firstParagraph.length > 150) {
				content = `${firstParagraph.substring(0, 147)}...`;
			} else {
				if (paragraphs.length > 1) {
					content = <Grid container direction={'column'} alignItems={'flex-start'}>
						<Grid item>
							<Typography>{firstParagraph}</Typography>
						</Grid>
						<Grid item>
							<Typography>[...]</Typography>
						</Grid>
					</Grid>;
				} else {
					content = <Typography>{firstParagraph}</Typography>;
				}
			}
			return <>{content}</>;
		} else {
			return <><Typography>(???)</Typography></>;
		}
	}

	renderToolStrip(renderContext: any): JSX.Element {
		return <></>;
	}

	readonly source: Document;
}
