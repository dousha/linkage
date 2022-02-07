import React from 'react';

const NetworkStateContext = React.createContext({
	state: 0,
	setState: (x: number) => {}
});

export default NetworkStateContext;
