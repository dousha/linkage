export enum ResourceMedia {
	UNKNOWN = '?',
	DIGITAL = 'DM',
	OPTICAL_MEDIUM = 'CD',
	MAGNETIC_MEDIUM = 'MT',
	SOLID_STATE_MEDIUM = 'TS',
	INTERNET_MEDIUM = 'OL',
	PHYSICAL_ITEM = 'MD',
	PRINT = 'TP',
	NON_DIGITAL_MEDIUM = 'PR',
}

export function mapResourceMediaToTranslatableString(x: ResourceMedia) {
	switch (x) {
		case ResourceMedia.UNKNOWN:
			return 'resourceMediaUnknown';
		case ResourceMedia.DIGITAL:
			return 'resourceMediaDigital';
		case ResourceMedia.OPTICAL_MEDIUM:
			return 'resourceMediaOpticalMedium';
		case ResourceMedia.MAGNETIC_MEDIUM:
			return 'resourceMediaMagneticMedium';
		case ResourceMedia.SOLID_STATE_MEDIUM:
			return 'resourceMediaSolidStateMedium';
		case ResourceMedia.INTERNET_MEDIUM:
			return 'resourceMediaInternet';
		case ResourceMedia.PHYSICAL_ITEM:
			return 'resourceMediaPhysicalItem';
		case ResourceMedia.PRINT:
			return 'resourceMediaPrint';
		case ResourceMedia.NON_DIGITAL_MEDIUM:
			return 'resourceMediaNonDigitalMedium';
	}
}
