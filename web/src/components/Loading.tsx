import React from "react"
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
`

const FullDiv = styled.div`
width:100%;
height:100vh;
display:flex;
justify-content: center;
align-items: center;
& > .rot {
    animation: ${rotate} 3s ease-out infinite;
}
`
type Props = {
    children?:React.ReactNode
}

function Loading({children}:Props){
    return (
        <FullDiv>
            <div className="rot">{children}</div>
        </FullDiv>
    )
}

export default Loading