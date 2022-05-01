import React, { useState } from 'react';
import { Dialog } from '@mui/material';

export interface DeleteDialogProps {
	docId: string;
}

export default function DeleteDialog(props: DeleteDialogProps) {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (<>
		<Dialog open={open} onClose={handleClose}>

		</Dialog>
	</>);
}
