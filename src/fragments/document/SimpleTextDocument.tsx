import { jsx } from '@emotion/react';
import { DeserializedDocument, Document } from '../../models/Document';

export class SimpleTextDocument implements DeserializedDocument {
	constructor(doc: Document) {
		this.source = doc;
	}

	async render(renderContext: any): Promise<jsx.JSX.Element[]> {
		return [];
	}

	async renderSummary(renderContext: any): Promise<jsx.JSX.Element[]> {
		return [];
	}

	readonly source: Document;
}
