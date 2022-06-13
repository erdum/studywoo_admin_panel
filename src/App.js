import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import getScreenDim from './helpers/getScreenDim';

const hideLoader = () => {
	const loader = document.getElementById('loader');

	if (loader) {
		loader.style.setProperty('opacity', '0');
		setTimeout(() => loader.remove(), 2000);
	}
};

const App = () => {

	useEffect(() => {
		setTimeout(() => hideLoader(), 3000);
		console.log(getScreenDim());
	}, []);

	return (
		<>
			<ChakraProvider>
				<BrowserRouter>
				</BrowserRouter>
			</ChakraProvider>
		</>
	);
};

export default App;
