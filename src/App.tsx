import React, { Suspense, useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import NotificationContext from './fragments/NotificationContext';
import NotificationBox from './fragments/NotificationBox';
import HeadBar from './fragments/HeadBar';
import NetworkStateContext from './fragments/NetworkStateContext';

function App() {
	const [notificationOpened, setNotificationOpened] = useState(false);
	const [notificationValue, setNotificationValue] = useState('');
	const [networkState, setNetworkState] = useState(0);

	return (
		<Suspense fallback={'Loading'}>
			<div className="App">
				<NotificationContext.Provider value={{
					open: notificationOpened,
					msg: notificationValue,
					notify: xs => {
						setNotificationOpened(true);
						setNotificationValue(xs);
					},
					close: () => {
						setNotificationOpened(false);
					},
				}}>
					<NetworkStateContext.Provider value={{
						state: networkState,
						setState: x => setNetworkState(x),
					}}>
						<HeadBar/>
						<LandingPage/>
						<NotificationBox/>
					</NetworkStateContext.Provider>
				</NotificationContext.Provider>
			</div>
		</Suspense>
	);
}

export default App;
