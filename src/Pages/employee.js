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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !taskName || !taskDescription || !resources) {
      alert("Please fill all the details");
      return;
    }

    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
      alert('Please enter a valid email');
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
      setName('');
      setEmail('');
      setTaskName('');
      setTaskDescription('');
      setResources('');
      alert("Employee Created");
      navigate('/employee-list');
    } catch (error) {
      console.log("Error creating employees: ", error);
    }
  }

  return (
    <Wrapper>
      <div className="container">
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
          <br />
          <input type="submit" value="Create Employee" className="btn" />
        </form>
      </div>
    </Wrapper>
  )
}

export default Employee

const Wrapper = styled.div`

height:100vh;
width: 100vw;
background: linear-gradient(to bottom, #560079, #e6e6e6);
display: flex;
align-items: center;

.container {
  width: 50vw;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

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
  @media only screen and (max-width: 600px) {
  .btn {
    width: 150px;
  }
}
  
  .txtarea{
    margin-bottom: 30px;
  }

`;
