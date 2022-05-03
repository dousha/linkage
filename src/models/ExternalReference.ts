import { Document } from './Document';
import { ResourceType } from './ResourceType';
import { ResourceMedia } from './ResourceMedia';

export interface ExternalReference extends Document {
	type: 'extRef';

	resourceType: ResourceType;
	resourceMedia: ResourceMedia;
	authors: string[];
	title: string;
	publisher: string;
	version: string;
	identification: string;
}

function generateAuthorString(authors: string[], trailing: string) {
	const names = authors.slice(0, 2);
	return names.join(', ') + (authors.length > 3 ? trailing : '');
}

export function updateValue(doc: ExternalReference, trailing: string) {
	doc.value = `${generateAuthorString(doc.authors, trailing)}. ${doc.title}[${doc.resourceType}/${doc.resourceMedia}]. ${doc.publisher}. ${doc.version}. ${doc.identification}.`;
}
