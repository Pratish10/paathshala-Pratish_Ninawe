import { API, graphqlOperation } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { listEmployees } from '../graphql/queries';
import { deleteEmployee } from '../graphql/mutations';

const FormData = () => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        getEmployees();
    }, [])

    const getEmployees = async () => {
        try {
            const { data } = await API.graphql(graphqlOperation(listEmployees));
            const employeeData = data.listEmployees.items;
            const sortedEmployees = employeeData.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();

                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                } else {
                    return 0;
                }
            });
            console.log("Data: ", sortedEmployees);
            setEmployees(employeeData);
        } catch (error) {
            console.log("Error fetching employees: ", error);
        }
    }

    const handleDelete = async (employeeId) => {
        try {
            await API.graphql(graphqlOperation(deleteEmployee, { input: { id: employeeId } }));
            console.log('Employee deleted successfully');
            // Updating the employees state after deletion
            setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== employeeId));
        } catch (error) {
            console.log('Error deleting employee: ', error);
        }
    }

    return (
        <Wrapper>
            <div className="container">
                {employees.length > 0 ? (
                    employees.map((employee) => (
                        <div key={employee.id} className="card">
                            <h3><strong>{employee.name}</strong></h3>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Task:</strong> {employee.taskName}</p>
                            <p><strong>Task Description:</strong> {employee.taskDescription}</p>
                            <p><strong>Resources:</strong> {employee.resources}</p>
                            <button
                                className="deleteButton"
                                onClick={() => handleDelete(employee.id)}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No employees found.</p>
                )}
            </div>
        </Wrapper>
    )
}

export default FormData

const Wrapper = styled.div`

    height:100vh;
    width: 100vw;
    background: linear-gradient(to bottom, #560079, #e6e6e6);
    display: flex;
    justify-content: center;
    position: absolute;
    padding-top: 50px  !important;
    overflow-x: hidden;
    .container {
        overflow-x: hidden;
        display: grid;
        grid-template-columns: auto auto auto auto;
        width: 75vw;
        padding: 50px;
        background-color: #fff;
    }
    .card{
        background: #fff;
        margin: 1em;
        overflow: auto;
        box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
        transition: all ease 200ms;
        border: 1px solid black;
        padding: 20px;
        text-align: center;
        height: 200px;
    }
    .card:hover {
        transform: scale(1.03);
        box-shadow: 0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02);
    }
    .card h3 {
        color: #222;
        margin-top: -0.2em;
        line-height: 1.4;
        font-size: 1.3em;
        font-weight: 500;
        transition: all ease-in 100ms;
        text-transform: uppercase;
    }
    .card p {
        /* color: #777; */
    }
    .deleteButton {
        cursor: pointer;
        color: red;
    }
`;