import React from 'react';

const NotificationContext = React.createContext({
	open: false,
	msg: '',
	notify: (xs: string) => {},
	close: () => {}
});

export default NotificationContext;
