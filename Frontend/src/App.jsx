import React, { useState } from "react";
import Home from "./components/Home";
import Feature from "./components/Feature";
import HowItWorks from "./components/HowItWorks";
import ImpactSection from "./components/Imapact";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import ProtectRoute from "./route/ProtectRoute";
import DashboardLayout from "./layout/DashboardLayout";
import SubmitComplainet from "./Page/dashboard/SubmitComplainet";
import MyComplainet from "./Page/dashboard/MyComplainet";
import DashboardRedirect from "./route/DashboardRedirect";
import AdminOverview from "./Page/dashboard/AdminOverview";
import AdminComplaints from "./Page/dashboard/AdminComplainet";
import ManageAdmins from "./Page/dashboard/ManageAdmin";

const App = () => {
  const [authModel, setAuthModel] = useState(null);
  // null || "login",||"signup"
  return (
    <>
      {authModel && (
        <Login mode={authModel} closeModel={() => setAuthModel(null)} />
      )}

      {/* create routea */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DashboardRedirect />
              <Navbar
                openLogin={() => setAuthModel("login")}
                openSignup={() => setAuthModel("signup")}
              />
              <Home openSignup={() => setAuthModel("signup")} />
              <Feature />
              <HowItWorks />
              <ImpactSection />
              <CallToAction
                openSignup={() => setAuthModel("signup")}
                openLogin={() => setAuthModel("login")}
              />
              <Footer />
            </>
          }
        />

        {/* protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectRoute>
              <DashboardLayout />
            </ProtectRoute>
          }
        >
          <Route index element={<DashboardRedirect />} /> // for by deafult goes
          to submit complainet page
          <Route path="submit-complaint" element={<SubmitComplainet />} />
          <Route path="my-complaint" element={<MyComplainet />} />
          <Route path="admin-overview" element={<AdminOverview />} />
          <Route path="admin-complaints" element={<AdminComplaints />} />
          <Route path="manage-admins" element={<ManageAdmins />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
