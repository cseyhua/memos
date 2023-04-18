import styled from "styled-components"
import Memo from "./Memo"

const memos = [
    {id:1, content:'新想法需要实际行动去验证'},
    {id:2, content:'相信一切灵感'}
]

const MemoList = styled.div`
margin-top: 0.5em;
`

export default function(){
    return (
        <MemoList>
            { memos.map(memo=><Memo key={memo.id} content={memo.content} />) }
        </MemoList>
    )
}