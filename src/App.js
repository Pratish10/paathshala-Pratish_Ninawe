import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Employee from "./Pages/employee";
import EmployeeList from "./Pages/employeeList";
import Notfound from "./Pages/notfound";
import awsconfig from './aws-exports';
import { Amplify } from 'aws-amplify'

Amplify.configure(awsconfig);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
