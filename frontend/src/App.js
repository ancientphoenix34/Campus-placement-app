import './App.css';
import AdminLogin from './component/Admin/AdminLogin';
import CreateOfficer from './component/Admin/CreateOfficer';
import CreateStudent from './component/Admin/CreateStudent';
import ManageOfficers from './component/Admin/ManageOfficers';
import ManageStudents from './component/Admin/ManageStudents';
import OfficerLogin from './component/Officer/OfficerLogin';
import CreatePlacement from './component/Officer/CreatePlacement';
import ManagePlacement from './component/Officer/ManagePlacement';
import StudentLogin from './component/Student/StudentLogin';
import StudentRegister from './component/Student/StudentRegister';
import ViewPlacement from './component/Student/ViewPlacement';
import ApplyPlacement from './component/Student/ApplyPlacement';
import StudentProfile from './component/Student/StudentProfile';
import Home from './component/Home';
import OfficerSidebar from './component/Officer/OfficerSidebar';
import StudentChat from './component/Student/StudentChat';
import OfficerChat from './component/Officer/OfficerChat';
import OfficerProfile from './component/Officer/OfficerProfile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentSidebar from './component/Student/StudentSidebar';
import AdminSidebar from './component/Admin/AdminSidebar';
import GetDetails from './component/Officer/GetDetails';
import Dashboard  from './component/Officer/Dashboard';
import EditStudents from './component/Admin/EditStudents';
import EditOfficers from './component/Admin/EditOfficers';
import EditPlacements from './component/Officer/EditPlacements';
import MyChatBot from './component/Chat/MyChatBot';
// import MyChats from './component/Chat/MyChats';

function App() {
  return (
    <div>

      {/* <Home/> */}
      {/* <AdminLogin/> */}
      {/* <CreateOfficer/> */}
      {/* <CreateStudent/> */}
      {/* <ManageOfficers/> */}
      {/* <ManageStudents/> */}
      {/* <AdminSidebar/> */}



      {/* <CreatePlacement/> */}
      {/* <ManagePlacement/> */}
      {/* <OfficerChat/> */}
      {/* <OfficerLogin/> */}
      {/* <OfficerProfile/> */}
      {/* <OfficerSidebar/> */}
      {/* <GetDetails/> */}
      {/* <Dashboard/> */}


      {/* <ApplyPlacement/> */}
      {/* <StudentChat/> */}
      {/* <StudentLogin/>          */}
      {/* <StudentProfile /> */}
      {/* <StudentRegister/> */}
      {/* <ViewPlacement/> */}
      {/* <StudentSidebar/> */}


    

       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/student">
          <Route path="login" element={<StudentLogin />} />
          <Route path="studentregister" element={<StudentRegister />} />
          <Route path="viewplacement" element={<ViewPlacement />} />
          <Route path="studentprofile" element={<StudentProfile />} />
          <Route path="studentchat" element={<StudentChat />} />
          <Route path="applyplacement/:id" element={<ApplyPlacement />} />
        </Route>
        <Route path="/officer">
          <Route path="login" element={<OfficerLogin />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="createplacement" element={<CreatePlacement />} />
          <Route path="manageplacement" element={<ManagePlacement />} />
          <Route path="officerchat" element={<OfficerChat/>} />
          <Route path="officerprofile" element={<OfficerProfile />} />
          <Route path="getdetails" element={<GetDetails/>} />
          <Route path='editplacements/:id' element={<EditPlacements/>}/>
        </Route>
        <Route path="/admin">
          <Route path="login" element={<AdminLogin />} />
          <Route path="createofficer" element={<CreateOfficer />} />
          <Route path="createstudent" element={<CreateStudent />} />
          <Route path="manageofficer" element={<ManageOfficers />} />
          <Route path="managestudents" element={<ManageStudents />} />
          <Route path='editstudents/:id' element={<EditStudents />}/>
          <Route path='editofficers/:id' element={<EditOfficers/>}/>
        </Route>
      </Routes> 
</div>
  );
}

export default App;
