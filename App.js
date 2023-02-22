import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import CandidateList from "./Component/Role/Admin/Candidate/CandidateList";
import ClientList from "./Component/Role/Admin/Client/ClientList";
import Dashboard from "./Component/Role/Admin/Dashboard";
import JobList from "./Component/Role/Admin/Job/JobList";
import Signup from "./Component/Signup";
import PrivateRoutes from "./Utils/PrivateRoutes";
// const LazyDashboard = React.lazy(()=> import ('./Component/Role/Admin/Dashboard'))
// const LazyCandidateList = React.lazy(()=> import ('./Component/Role/Admin/Candidate/CandidateList'))
// const LazyJobList = React.lazy(()=> import ('./Component/Role/Admin/Job/JobList'))
// const LazyClientList = React.lazy(()=> import ('./Component/Role/Admin/Client/ClientList'))
// const LazySignup = React.lazy(()=> import ("./Component/Signup"))
// const LazyLogin = React.lazy(()=> import ("./Component/Login"))
import "./App.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/candidatelist" element={<CandidateList />} />
          <Route exact path="/joblist" element={<JobList />} />
          <Route exact path="/clientlist" element={<ClientList />} />
           {/* <Route exact path="/dashboard" element={<React.Suspense fallback={<div class="text-center mt-5"><img src="assets/img/logo.png" alt="" /></div>}><LazyDashboard /></React.Suspense>} />
          <Route exact path="/candidatelist" element={<React.Suspense fallback={<div class="text-center mt-2"><img src="assets/img/logo.png" alt="" /></div>}><LazyCandidateList /></React.Suspense>} />
          <Route exact path="/joblist" element={<React.Suspense fallback={<div class="text-center mt-2"><img src="assets/img/logo.png" alt="" /></div>}><LazyJobList /></React.Suspense>} />
          <Route exact path="/clientlist" element={<React.Suspense fallback={<div class="text-center mt-2"><img src="assets/img/logo.png" alt="" /></div>}><LazyClientList /></React.Suspense>} /> */}
        </Route>
         <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Login />} /> 
         <Route exact path="*" element={<Login />} /> 
        {/* <Route exact path="/signup" element={<React.Suspense fallback={<div class="text-center mt-2"><img src="assets/img/logo.png" alt="" /></div>}><LazySignup /></React.Suspense>} />
        <Route exact path="/" element={<React.Suspense fallback={<div class="text-center mt-2"><img src="assets/img/logo.png" alt="" /></div>}><LazyLogin /></React.Suspense>} />
        <Route exact path="*" element={<React.Suspense fallback={<div class="text-center mt-2"><img src="assets/img/logo.png" alt="" /></div>}><LazyLogin /></React.Suspense>} /> */}

      </Routes>
    </Router>
  );
}

export default App;
