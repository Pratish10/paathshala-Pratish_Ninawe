import React, { useState } from 'react'
import styled from "styled-components"
import { API, graphqlOperation } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import * as mutations from '../graphql/mutations';

const Employee = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [resources, setResources] = useState('');
  // const [employeeID, setEmployeeID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill all the details");
      return;
    }

    try {
      const employeeInput = {
        name: name,
        email: email,
        taskName: taskName,
        taskDescription: taskDescription,
        resources: resources

      };
      const { data } = await API.graphql(graphqlOperation(mutations.createEmployee, { input: employeeInput }));
      console.log("Employee Data", data);
      // setName('');
      // setEmail('');
      // setEmployeeID(getemployeeID);
      alert("Employee Created");
      // console.log(data.createEmployee.id);
      navigate('/form-data');
    } catch (error) {
      console.log("Error creating employees: ", error);
    }
  }

  return (
    <Wrapper>
      <h3>Create Employee</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="taskName">Task Name</label>
        <input type="text" id="taskName" name="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} />

        <label htmlFor="taskDescription">Task Description</label>
        <textarea id="taskDescription" rows="5" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} ></textarea>

        <label htmlFor="resources">Resources</label>
        <textarea id="resources" rows="5" value={resources} onChange={(e) => setResources(e.target.value)} ></textarea>

        <input type="submit" value="Create Employee" className="btn" />
      </form>
      <hr />

      {/* {employeeID && <TaskResource employeeID={employeeID} />} */}
    </Wrapper>
  )
}

export default Employee

const Wrapper = styled.div`

  h3 {
    text-align: center;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: large;
    color: #560079;
    text-transform: uppercase;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: large;
    color: #560079;
  
  }
  
  input,
  select {
    padding: 10px;
    margin-bottom: 20px;
  }
  
  input[type="submit"] {
    background-color: #560079;
    color: white;
    cursor: pointer;
    font-weight: bold;
    margin: 0 auto;
    display: block;
  }
  
  .btn{
    width: 300px;
  }
  
  .txtarea{
    margin-bottom: 30px;
  }
`;
