import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import AdminLayout from "./Layouts/AdminLayout";
import useAuthManager from "./Composables/useAuthManager";

function App() {

const {getUserId} = useAuthManager()

  return (
    <>
      <BrowserRouter>
        <Routes>
         {!getUserId() &&   <Route path="/auth/*" element={<AuthLayout />} />}
         
          <Route path="/*" element={<MainLayout />} />

          {/* <Route path="/auth/*" element={<AuthLayout />} />

          <Route path="/*" element={<MainLayout />} /> */}

          <Route path="/adminPanel/*" element={<AdminLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
