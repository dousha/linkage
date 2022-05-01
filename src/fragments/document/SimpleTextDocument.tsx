import React from 'react';
import { DeserializedDocument, Document } from '../../models/Document';
import { Typography } from '@mui/material';

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
		return <>
			<Typography>{this.source.value}</Typography>
		</>;
	}

	readonly source: Document;
}
