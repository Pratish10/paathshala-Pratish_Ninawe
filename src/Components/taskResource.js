import React, { useState } from 'react'
import styled from "styled-components"
import { API, graphqlOperation } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import * as mutations from '../graphql/mutations';

const TaskResource = ({ employeeID }) => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [resourceName, setResourceName] = useState('');

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    try {
      const taskInput = {
        name: taskName,
        description: taskDescription,
        employeeID: employeeID,
      };
      const { data } = await API.graphql(graphqlOperation(mutations.createTasks, { input: taskInput }));
      console.log("Task Data: ", data);
      // setTaskName('');
      // setTaskDescription('');
      // navigate('/form-data');
      alert("Task Created");
    } catch (error) {
      console.log("Error creating tasks: ", error);
    }
  }
  const handleSubmitResource = async (e) => {
    e.preventDefault();
    try {
      const resourceInput = {
        employeeID: employeeID,
        resources: resourceName,
      };
      const { data } = await API.graphql(graphqlOperation(mutations.createResources, { input: resourceInput }));
      console.log("Resource Created: ", data);
      // setResourceName('');
      alert("Resource Created");
      navigate('/form-data');
    } catch (error) {
      console.log("Error creating resource: ", error);
    }
  }


  return (
    <Wrapper>
      <h3>Create Task and Resource</h3>

      <form onSubmit={handleSubmitTask}>
        <label htmlFor="name">Task Name</label>
        <input type="text" id="name" name="name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />

        <label htmlFor="taskDescription">Task Description</label>
        <textarea id="taskDescription" rows="5" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} ></textarea>
        <br />
        <input type="submit" value="Create Task" className="btn" />
      </form>
      <hr />

      <form onSubmit={handleSubmitResource}>
        <label htmlFor="resourceName">Resource</label>
        <textarea id="resourceName" rows="5" value={resourceName} onChange={(e) => setResourceName(e.target.value)} ></textarea>
        <br />

        <input type="submit" value="Create Resource" className="btn" />
      </form>

    </Wrapper>
  )
}

export default TaskResource

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
