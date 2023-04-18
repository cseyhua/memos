import styled from 'styled-components'

const Selector = styled.select`
padding:0.5em 1em;
border-radius:0.5em;
background-color: transparent;
&:focus{
    outline:none;
}
`

const Option = styled.option`
`

export default function () {
  return (
    <Selector>
      <Option value={1}>仅自己可见</Option>
      <Option value={2}>仅朋友可见</Option>
      <Option value={1}>所有人可见</Option>
    </Selector>
  )
}
