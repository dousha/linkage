import { LocalSettings } from './LocalSettings';
import { Document } from './Document';
import PouchDB from 'pouchdb';

PouchDB.plugin(require('pouchdb-find').default);

class DocumentStash {
	constructor() {
		this.db = new PouchDB('linkage');
	}

	public getLocalSettings(): LocalSettings {
		const savedSettings = localStorage.getItem('localSettings');
		if (savedSettings != null) {
			try {
				const out = JSON.parse(savedSettings);
				return out as LocalSettings;
			} catch (e) {
				return {
					sync: false,
					secure: false,
					remoteAddress: '',
					username: '',
					password: '',
				};
			}
		} else {
			return {
				sync: false,
				secure: false,
				remoteAddress: '',
				username: '',
				password: '',
			};
		}
	}

	public setLocalSettings(xs: LocalSettings) {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('localSettings', JSON.stringify(xs));
		} else {
			throw new Error('LocalStorage not present!');
		}
	}

	public push() {
		const localSettings = this.getLocalSettings();
		if (localSettings.sync) {
			return PouchDB.replicate(this.db, DocumentStash.assembleConnectionString(localSettings));
		} else {
			return Promise.resolve();
		}
	}

	public pull() {
		const localSettings = this.getLocalSettings();
		if (localSettings.sync) {
			return PouchDB.replicate(DocumentStash.assembleConnectionString(localSettings), this.db);
		} else {
			return Promise.resolve();
		}
	}

	public sync(): Promise<{}> {
		const localSettings = this.getLocalSettings();
		if (localSettings.sync) {
			return PouchDB.sync(this.db, DocumentStash.assembleConnectionString(localSettings));
		} else {
			return Promise.resolve({});
		}
	}

	public isDatabaseEmpty(): Promise<boolean> {
		return this.db.find({
			selector: {
				type: {'$ne': '__relation'},
			},
		}).then(info => info.docs.length === 0);
	}

	public insertDocument(doc: Document) {
		return this.db.put(doc);
	}

	public async getDocument(id: string): Promise<Document & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta> {
		return this.db.get<Document>(id);
	}

	public async getRecentDocuments(): Promise<Document[]> {
		const docs = await this.db.allDocs<Document>({
			limit: 30,
			include_docs: true,
			attachments: true,
		});
		return docs.rows.map(x => x.doc)
			.filter(x => x && 'type' in x && x.type !== '__relation')
			.map(x => x as Document);
	}

	public async deleteDocument(id: string): Promise<boolean> {
		try {
			const doc = await this.getDocument(id);
			await this.db.remove(doc);
			return true;
		} catch (e) {
			return false;
		}
	}


	public async init() {
		await this.db.createIndex({
			index: {
				fields: ['type'],
			},
		});
		await this.db.createIndex({
			index: {
				fields: ['creationTime', 'updateTime'],
			},
		});
	}

	private static assembleConnectionString(xs: LocalSettings) {
		return `http${xs.secure ? 's' : ''}://${xs.username}:${xs.password}@${xs.remoteAddress}/linkage`;
	}

	private readonly db;
}

const DocumentStashInstance = new DocumentStash();

export default DocumentStashInstance;
