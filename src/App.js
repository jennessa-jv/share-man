import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
  <>
 <Toaster
  toastOptions={{
    style: {
      background: "#4f2843",
      color: "#fff"
    }
  }}
/>
  <BrowserRouter>
  <Routes> 
    <Route path="/" element={<Home/>}/>
    <Route path="/editor/:roomId" element={<EditorPage/>}/>
  </Routes>
  </BrowserRouter>
  </>

  );
}

export default App;
