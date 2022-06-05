import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Sidebar } from './components';

const App = () => {
	return (
		<>
			<Sidebar />
			<BrowserRouter>
			</BrowserRouter>
		</>
	);
};

export default App;
