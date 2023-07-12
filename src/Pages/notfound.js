import React from 'react'
import styled from "styled-components"


const Notfound = () => {
    return (
        <Wrapper>
            <h4>404</h4>
            <p>Not Found</p>
        </Wrapper>
    )
}

export default Notfound

const Wrapper = styled.div`
    height:100vh;
    width: 100vw;
    background: linear-gradient(to bottom, #560079, #e6e6e6);
    display: flex;
    align-items: center;
    justify-content: center;
`;