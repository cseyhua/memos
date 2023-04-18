import styled from "styled-components"
import { Search } from 'lucide-react'

const HomeSidebar = styled.div`

`

const SearchInput = styled.div`
display:flex;
gap: 0.5em;
align-items:center;
// border:2px solid #909090; 
background-color: #f0f0f0;
border-radius:0.5em;
padding:0 0.25em;
&>input{
    padding: 0.5em 0;
    border-radius:0.5em;
    line-height: 20px;
    font-weight:300;
    max-width: 120px;
    background-color:transparent;
    border:0;
    &:focus{
        outline:none;
    }
}
`

function SearchBox(){
    return <SearchInput>
        <Search size={20} stroke="#909090" />
        <input placeholder="想要看点什么" />
    </SearchInput>
}


export default function(){
    return (
        <HomeSidebar>
            <SearchBox />
        </HomeSidebar>
    )
}