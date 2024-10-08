import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import VideoUpload from './pages/VideoUpload/VideoUpload'

import "./App.scss";

const App = () => {
 
  return (
    <BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />}></Route>
        <Route path="/videos/:videoid" element={<HomePage />} />
        <Route path='/upload' element={<VideoUpload />}></Route>
			</Routes>
		</BrowserRouter>

  );
};

export default App;
