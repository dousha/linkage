import { Document } from './Document';

export interface Relation extends Document {
	type: '__relation';

	from: string;
	to: string;
}
