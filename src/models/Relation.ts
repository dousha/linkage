import { Document } from './Document';

export interface Relation extends Document {
	from: string;
	to: string;
}
