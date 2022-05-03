export enum ResourceType {
	UNKNOWN = '?',
	AUDIO_RECORDING = 'A',
	PHYSICAL_MODEL = 'B',
	CONFERENCE_EXCERPT = 'C',
	COMPUTER_PROGRAM = 'CP',
	DISSERTATION = 'D',
	DATABASE = 'DB',
	EXECUTABLE = 'E',
	ELECTRONIC_BULLETIN_BOARD = 'EB',
	FORMAT = 'F',
	FORMAT_DE_FACTO = 'FD',
	INDEX_DATA = 'I',
	JOURNAL = 'J',
	LEGAL_DOCUMENT = 'L',
	MANUSCRIPT = 'M',
	NEWS = 'N',
	PATENT = 'P',
	ARCHIVED_COMMUNICATIONS = 'R',
	STANDARD = 'S',
	VIDEO = 'V',
}

export function mapResourceTypeToTranslatableString(x: ResourceType) {
	switch (x) {
		case ResourceType.UNKNOWN:
			return 'resourceTypeUnknown';
		case ResourceType.AUDIO_RECORDING:
			return 'resourceTypeAudioRecording';
		case ResourceType.PHYSICAL_MODEL:
			return 'resourceMediaPhysicalItem';
		case ResourceType.CONFERENCE_EXCERPT:
			return 'resourceTypeConferenceExcerpt';
		case ResourceType.COMPUTER_PROGRAM:
			return 'resourceTypeComputerProgram';
		case ResourceType.DISSERTATION:
			return 'resourceTypeDissertation';
		case ResourceType.DATABASE:
			return 'resourceTypeDatabase';
		case ResourceType.EXECUTABLE:
			return 'resourceTypeExecutable';
		case ResourceType.ELECTRONIC_BULLETIN_BOARD:
			return 'resourceTypeElectronicBulletinBoard';
		case ResourceType.FORMAT:
			return 'resourceTypeFormat';
		case ResourceType.FORMAT_DE_FACTO:
			return 'resourceTypeDeFactoFormat';
		case ResourceType.INDEX_DATA:
			return 'resourceTypeIndexedData';
		case ResourceType.JOURNAL:
			return 'resourceTypeJournal';
		case ResourceType.LEGAL_DOCUMENT:
			return 'resourceTypeLegalDocument';
		case ResourceType.MANUSCRIPT:
			return 'resourceTypeManuscript';
		case ResourceType.NEWS:
			return 'resourceTypeNews';
		case ResourceType.PATENT:
			return 'resourceTypePatent';
		case ResourceType.ARCHIVED_COMMUNICATIONS:
			return 'resourceTypeArchivedCommunications';
		case ResourceType.STANDARD:
			return 'resourceTypeStandard';
		case ResourceType.VIDEO:
			return 'resourceTypeVideo';
	}
}
