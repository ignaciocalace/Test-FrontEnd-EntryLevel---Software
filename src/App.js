import { BrowserRouter, Route, Routes } from "react-router-dom";
import AbmCreateClient from "./components/forms/AbmCreateClient.jsx";
import AbmDetail from "./components/AbmDetail.jsx";
import AbmListContainer from "./components/AbmListContainer.jsx";
import NavBar from "./components/NavBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<AbmListContainer />} />
          <Route path="/:cid" element={<AbmDetail />} />
          <Route path="/createClient" element={<AbmCreateClient />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
