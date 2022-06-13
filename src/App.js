import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header';

const App = () => {
	return (
		<>
			<Header brandName={'Studywoo'}/>
			<ChakraProvider>
				<BrowserRouter>
				</BrowserRouter>
			</ChakraProvider>
		</>
	);
};

export default App;
