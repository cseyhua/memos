import styled from "styled-components"

const Memo = styled.div`
margin: 0 0 8px 0;
padding: 1em;
border-radius:0.55em;
background-color:#f0f0f0;
&>.top {
    font-size:0.65em;
    color: #797979;
}
&>.content{
}
`

type Props = {
    content:string
}

export default function(props:Props){
    return <Memo>
        <div className="top">
            <span>1分钟前</span>
        </div>
        <div className="content">{props.content}</div>
    </Memo>
}