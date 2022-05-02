import { Document } from '../models/Document';
import DocumentStashInstance from '../models/DocumentStash';
import { generateId } from '../util/Utils';
import { Relation } from '../models/Relation';
import DocumentStash from '../models/DocumentStash';

export async function commitInput(xs: string, id?: string): Promise<Array<Document> | string> {
	const trimmedInput = xs.trim();

	if (trimmedInput.length < 1) {
		console.log('Input too short');
		return Promise.reject();
	}

	if (trimmedInput.startsWith('?')) {
		// it's a query
		console.log('Querying documents');
		return queryDocuments(xs);
	} else {
		// it's a document
		console.log('Inserting document');
		return insertDocument(xs, id);
	}
}

async function queryDocuments(query: string): Promise<Array<Document>> {
	// TODO
	return [];
}

async function insertRelation(from: string, to: string) {
	const rel: Relation = {
		_id: generateId(),
		type: '__relation',
		value: '',
		from: from,
		to: to,
		creationTime: Date.now(),
		updateTime: Date.now()
	};
	return DocumentStash.insertDocument(rel);
}

async function insertPlainTextDocument(content: string, id?: string) {
	let doc: Document;
	if (id) {
		const prevDoc = await DocumentStashInstance.getDocument(id);
		doc = {
			_id: id,
			type: 'text',
			value: content,
			creationTime: prevDoc.creationTime,
			updateTime: Date.now(),
		};
		Reflect.set(doc, '_rev', prevDoc._rev);
	} else {
		doc = {
			_id: generateId(),
			type: 'text',
			value: content,
			creationTime: Date.now(),
			updateTime: Date.now()
		};
	}
	return DocumentStashInstance.insertDocument(doc);
}

async function insertDocument(stuff: string, id?: string): Promise<string> {
	// the first line specifies the type of the document
	// the rest of lines simply follows
	const lines = stuff.split('\n');
	if (lines.length < 2) {
		// single line document is either a relation
		// or a text/plain
		if (lines[0].startsWith('ln ')) {
			const relation = lines[0].split(' ');
			if (relation.length !== 3) {
				// still, plain text document
				const response = await insertPlainTextDocument(stuff, id);
				if (response.ok) {
					return response.id;
				} else {
					throw new Error('insert failure');
				}
			} else {
				// it's a relation!
				const response = await insertRelation(relation[1], relation[2]);
				if (response.ok) {
					return response.id;
				} else {
					throw new Error('insert failure');
				}
			}
		} else {
			// plain text
			const response = await insertPlainTextDocument(stuff, id);
			if (response.ok) {
				return response.id;
			} else {
				throw new Error('insert failure');
			}
		}
	} else {
		// TODO
		// multiline document can be a bit tricky to parse
		// we can just do text/plain for now
		const response = await insertPlainTextDocument(stuff, id);
		if (response.ok) {
			return response.id;
		} else {
			throw new Error('insert failure');
		}
	}
}
