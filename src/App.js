import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import Content from './pages/Content';
import Detail from './pages/Detail';
import Navbar from '../src/component/Navbar';

function App() {

  return (
    <>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Content />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
    </>
  );
}

export default App;
