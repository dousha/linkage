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
		const firstParagraph = this.source.value.split('\n\n').pop();
		if (firstParagraph) {
			let content;
			if (firstParagraph.length > 150) {
				content = `${firstParagraph.substring(0, 147)}...`;
			} else {
				content = firstParagraph;
			}
			return <><Typography>{content}</Typography></>;
		} else {
			return <><Typography>(???)</Typography></>;
		}
	}

	readonly source: Document;
}
