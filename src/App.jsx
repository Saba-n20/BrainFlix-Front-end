import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import "./App.scss";

const App = () => {
 
  return (
    <BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />}></Route>
        <Route path="/videos/:videoid" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
  );
};

export default App;
