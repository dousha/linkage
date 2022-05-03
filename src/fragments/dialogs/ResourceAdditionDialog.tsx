import React, { useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Tooltip,
} from '@mui/material';
import { LibraryAdd } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { mapResourceTypeToTranslatableString, ResourceType } from '../../models/ResourceType';
import { mapResourceMediaToTranslatableString, ResourceMedia } from '../../models/ResourceMedia';
import AuthorEditor from '../components/AuthorEditor';
import { generateId, runAtLeastFor } from '../../util/Utils';
import { ExternalReference, updateValue } from '../../models/ExternalReference';
import { insertExternalReference } from '../../logic/InputParser';

export default function ResourceAdditionDialog() {
	const [open, setOpen] = useState(false);
	const [type, setType] = useState(ResourceType.UNKNOWN);
	const [medium, setMedium] = useState(ResourceMedia.UNKNOWN);
	const [title, setTitle] = useState('');
	const [authors, setAuthors] = useState<string[]>([]);
	const [publisher, setPublisher] = useState('');
	const [version, setVersion] = useState('');
	const [identification, setIdentification] = useState('');

	const [isSubmitting, setSubmitting] = useState(false);
	const [isTitleEmpty, setTitleEmpty] = useState(false);

	const {t} = useTranslation();

	const discardState = () => {
		setType(ResourceType.UNKNOWN);
		setMedium(ResourceMedia.UNKNOWN);
		setTitle('');
		setAuthors([]);
		setPublisher('');
		setVersion('');
		setIdentification('');
		setTitleEmpty(false);
		setSubmitting(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		if (title.trim().length < 1) {
			setTitleEmpty(true);
			return;
		}

		setSubmitting(true);
		runAtLeastFor(800, async () => {
			const doc: ExternalReference = {
				_id: generateId(),
				authors: authors,
				creationTime: Date.now(),
				identification: identification,
				publisher: publisher,
				resourceMedia: medium,
				resourceType: type,
				title: title,
				type: 'extRef',
				updateTime: Date.now(),
				value: '',
				version: version,
			};
			updateValue(doc, t('textEtAl'));
			await insertExternalReference(doc);
		}).then(() => {
			setSubmitting(false);
			setOpen(false);
			discardState();
		});
	};

	const handleDiscard = () => {
		setOpen(false);
		discardState();
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleTypeChange = (e: SelectChangeEvent<ResourceType>) => {
		setType(e.target.value as ResourceType || ResourceType.UNKNOWN);
	};

	const handleMediumChange = (e: SelectChangeEvent<ResourceMedia>) => {
		setMedium(e.target.value as ResourceMedia || ResourceMedia.UNKNOWN);
	};

	return (
		<>
			<Tooltip title={t('tooltipAddResource')}>
				<IconButton onClick={handleOpen}>
					<LibraryAdd/>
				</IconButton>
			</Tooltip>
			<Dialog open={open} onClose={handleClose} fullWidth={true}>
				<DialogTitle>
					{t('dialogAddResourceTitle')}
				</DialogTitle>
				<DialogContent>
					<Grid container direction={'column'} spacing={1}>
						<Grid item/>
						<Grid item>
							<FormControl fullWidth={true}>
								<InputLabel id={'label-resource-type'}>{t('labelResourceType')}</InputLabel>
								<Select labelId={'label-resource-type'} id={'resource-type'}
										label={t('labelResourceType')} value={type} onChange={handleTypeChange}>
									<MenuItem
										value={ResourceType.UNKNOWN}>{t(mapResourceTypeToTranslatableString(ResourceType.UNKNOWN))}</MenuItem>
									<MenuItem
										value={ResourceType.AUDIO_RECORDING}>{t(mapResourceTypeToTranslatableString(ResourceType.AUDIO_RECORDING))}</MenuItem>
									<MenuItem
										value={ResourceType.PHYSICAL_MODEL}>{t(mapResourceTypeToTranslatableString(ResourceType.PHYSICAL_MODEL))}</MenuItem>
									<MenuItem
										value={ResourceType.CONFERENCE_EXCERPT}>{t(mapResourceTypeToTranslatableString(ResourceType.CONFERENCE_EXCERPT))}</MenuItem>
									<MenuItem
										value={ResourceType.COMPUTER_PROGRAM}>{t(mapResourceTypeToTranslatableString(ResourceType.COMPUTER_PROGRAM))}</MenuItem>
									<MenuItem
										value={ResourceType.DISSERTATION}>{t(mapResourceTypeToTranslatableString(ResourceType.DISSERTATION))}</MenuItem>
									<MenuItem
										value={ResourceType.DATABASE}>{t(mapResourceTypeToTranslatableString(ResourceType.DATABASE))}</MenuItem>
									<MenuItem
										value={ResourceType.ELECTRONIC_BULLETIN_BOARD}>{t(mapResourceTypeToTranslatableString(ResourceType.ELECTRONIC_BULLETIN_BOARD))}</MenuItem>
									<MenuItem
										value={ResourceType.EXECUTABLE}>{t(mapResourceTypeToTranslatableString(ResourceType.EXECUTABLE))}</MenuItem>
									<MenuItem
										value={ResourceType.FORMAT}>{t(mapResourceTypeToTranslatableString(ResourceType.FORMAT))}</MenuItem>
									<MenuItem
										value={ResourceType.FORMAT_DE_FACTO}>{t(mapResourceTypeToTranslatableString(ResourceType.FORMAT_DE_FACTO))}</MenuItem>
									<MenuItem
										value={ResourceType.INDEX_DATA}>{t(mapResourceTypeToTranslatableString(ResourceType.INDEX_DATA))}</MenuItem>
									<MenuItem
										value={ResourceType.JOURNAL}>{t(mapResourceTypeToTranslatableString(ResourceType.JOURNAL))}</MenuItem>
									<MenuItem
										value={ResourceType.LEGAL_DOCUMENT}>{t(mapResourceTypeToTranslatableString(ResourceType.LEGAL_DOCUMENT))}</MenuItem>
									<MenuItem
										value={ResourceType.MANUSCRIPT}>{t(mapResourceTypeToTranslatableString(ResourceType.MANUSCRIPT))}</MenuItem>
									<MenuItem
										value={ResourceType.NEWS}>{t(mapResourceTypeToTranslatableString(ResourceType.NEWS))}</MenuItem>
									<MenuItem
										value={ResourceType.PATENT}>{t(mapResourceTypeToTranslatableString(ResourceType.PATENT))}</MenuItem>
									<MenuItem
										value={ResourceType.ARCHIVED_COMMUNICATIONS}>{t(mapResourceTypeToTranslatableString(ResourceType.ARCHIVED_COMMUNICATIONS))}</MenuItem>
									<MenuItem
										value={ResourceType.STANDARD}>{t(mapResourceTypeToTranslatableString(ResourceType.STANDARD))}</MenuItem>
									<MenuItem
										value={ResourceType.VIDEO}>{t(mapResourceTypeToTranslatableString(ResourceType.VIDEO))}</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl fullWidth={true}>
								<InputLabel id={'label-resource-media'}>{t('labelResourceMedia')}</InputLabel>
								<Select labelId={'label-resource-media'} id={'resource-media'}
										label={t('labelResourceMedia')} value={medium} onChange={handleMediumChange}>
									<MenuItem
										value={ResourceMedia.UNKNOWN}>{t(mapResourceMediaToTranslatableString(ResourceMedia.UNKNOWN))}</MenuItem>
									<MenuItem
										value={ResourceMedia.INTERNET_MEDIUM}>{t(mapResourceMediaToTranslatableString(ResourceMedia.INTERNET_MEDIUM))}</MenuItem>
									<MenuItem
										value={ResourceMedia.DIGITAL}>{t(mapResourceMediaToTranslatableString(ResourceMedia.DIGITAL))}</MenuItem>
									<MenuItem
										value={ResourceMedia.NON_DIGITAL_MEDIUM}>{t(mapResourceMediaToTranslatableString(ResourceMedia.NON_DIGITAL_MEDIUM))}</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item>
							<TextField id={'input-resource-title'} label={t('labelResourceTitle')}
									   value={title}
									   onChange={e => {
										   setTitleEmpty(false);
										   setTitle(e.target.value);
									   }} fullWidth error={isTitleEmpty} required/>
						</Grid>
						<Grid item>
							<AuthorEditor onChange={setAuthors}/>
						</Grid>
						<Grid item>
							<TextField id={'input-publisher'} label={t('labelResourcePublisher')} value={publisher}
									   onChange={e => setPublisher(e.target.value)} fullWidth/>
						</Grid>
						<Grid item>
							<TextField id={'input-version'} label={t('labelResourceVersion')} value={version}
									   onChange={e => setVersion(e.target.value)} fullWidth/>
						</Grid>
						<Grid item>
							<TextField id={'input-identification'} label={t('labelResourceIdentification')}
									   value={identification} onChange={e => setIdentification(e.target.value)}
									   fullWidth/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Grid container direction={'row-reverse'}>
						<Grid item>
							<Button color={'primary'} onClick={handleSave}
									disabled={isSubmitting}>{t('buttonSave')}</Button>
						</Grid>
						<Grid item>
							<Button color={'secondary'} onClick={handleDiscard}
									disabled={isSubmitting}>{t('buttonDiscard')}</Button>
						</Grid>
					</Grid>
				</DialogActions>
			</Dialog>
		</>
	);
}
