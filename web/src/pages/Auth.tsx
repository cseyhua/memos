import styled from 'styled-components'
import { LogIn } from 'lucide-react'
import { store, useUserStore } from '@/store'
import { useState } from 'react'
import * as api from '@/api'
import { doSignIn, doSignOut } from '@/store'
import { useNavigate } from 'react-router-dom'

const Auth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  & .title {
    font-size: 24px;
  }
`
const Input = styled.input`
  outline: 0;
  padding: 0.5em 0.5em;
  font-size: 20px;
  border-radius: 0.5em;
  border: 3px solid #efefef;
  color: #606060;
  &:focus {
    border: 3px solid blue;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.25em;
`
const SubmitButtom = styled.button`
  outline: 0;
  border: 0;
  background-color: green;
  font-size: 20px;
  padding: 0.5em 0.5em;
  cursor: pointer;
  border-radius: 0.5em;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  gap: 0.5em;
`

export default function () {
  const { hostExsited } = useUserStore()

  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (name.length < 4 || pass.length < 4) {
      return
    }
    try {
      let { error } = await api.signin(name, pass)
      if (!error) {
        console.log(error)
        let user = await doSignIn()
        navigate('/')
      }
    } catch (err) {}
  }

  const handleHostActivate = async () => {
    if (name.length < 4 || pass.length < 4) {
      return
    }
    try {
      let { error } = await api.signup(name, pass)
      if (!error) {
        let user = await doSignIn()
        navigate('/')
      }
    } catch (err) {}
  }

  return (
    <Auth>
      <div>
        <div>
          <span className="title">memos</span>
        </div>
        <div>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="你叫个啥>"
            />
            <Input
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              name="pass"
              placeholder="你的钥匙"
            />
            <div>
              {hostExsited ? (
                <SubmitButtom onClick={handleSubmit}>
                  <LogIn size={20} />
                  "登录"
                </SubmitButtom>
              ) : (
                <SubmitButtom onClick={handleHostActivate}>
                  <LogIn size={20} />
                  "激活HOST"
                </SubmitButtom>
              )}
            </div>
          </Form>
        </div>
      </div>
    </Auth>
  )
}
