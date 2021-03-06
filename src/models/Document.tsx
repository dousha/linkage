// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { SimpleTextDocument } from '../fragments/document/SimpleTextDocument';

export interface Document {
	_id: string;
	type: string;
	value: string;

	creationTime: number;
	updateTime: number;
}

export interface DeserializedDocument {
	source: Document;

	render: (renderContext?: any) => Promise<JSX.Element>;
	renderSummary: (renderContext?: any) => Promise<JSX.Element>;
	renderToolStrip: (renderContext?: any) => JSX.Element;
}

export async function compileDocument(doc: Document): Promise<DeserializedDocument> {
	switch (doc.type) {
		default:
		case 'text':
			return new SimpleTextDocument(doc);
	}
}
