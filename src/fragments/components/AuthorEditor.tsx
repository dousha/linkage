import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AuthorChip {
	title: string;
	inputValue: string;
}

const filter = createFilterOptions<AuthorChip>();

export interface AuthorEditorProps {
	authors?: string[];
	onChange?: (xs: string[]) => void;
}

export default function AuthorEditor(props: AuthorEditorProps) {
	const {t} = useTranslation();
	const [knownAuthors, setKnownAuthors] = useState<AuthorChip[]>(props.authors ? props.authors.map(it => {
		return {
			title: it,
			inputValue: it,
		};
	}) : []);

	useEffect(() => {
		// TODO: load known authors
	}, [knownAuthors]);

	return (<>
		<Autocomplete
			multiple
			id={'input-authors'}
			filterSelectedOptions={true}
			freeSolo
			filterOptions={(options, state) => {
				const filtered = filter(options, state);
				const {inputValue} = state;
				const isExisting = options.some((option) => inputValue === option.title);
				if (inputValue !== '' && !isExisting) {
					filtered.push({
						inputValue,
						title: `${t('textAdd')} "${inputValue}"`,
					});
				}
				return filtered;
			}}
			getOptionLabel={(option) => {
				if (typeof option === 'string') {
					return option;
				}

				if (option.inputValue) {
					return option.inputValue;
				}

				return option.title;
			}}
			renderOption={(props, option) => <li {...props}>{option.title}</li>}
			renderInput={(params) => (
				<TextField
					{...params}
					label={t('labelResourceAuthors')}
				/>
			)}
			options={knownAuthors}
			onChange={(event, value) => {
				if (props.onChange) {
					props.onChange(value.map(it => typeof it === 'string' ? it : it.inputValue));
				}
			}}/>
	</>);
}
