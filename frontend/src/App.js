import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Homescreen from "./screens/Homescreen.js";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Header/>
      <main className="py-3">
       
        <Outlet/>
        
      </main>
      
      <Footer />
      <ToastContainer/>
    </div>
  );
}

export default App;