import useInput from '@/hooks/useInput'
import './Auth.less'
import { useGlobalStore, doSignIn } from '@/store/hooks'
import { signin, signup } from '@/fetch'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const { systemStatus } = useGlobalStore()

  const name = useInput()
  const pass = useInput()
  const navigate = useNavigate()


  const handleSignin = async ()=>{
    if(name.value.length < 4){return}
    if(pass.value.length < 4){return}
    await signin(name.value, pass.value)
    let user = await doSignIn()
    console.log(user)
    if(user){
      navigate('/')
    }else{
      navigate('/explore')
    }
  }

  const handleHostActive = async () => {
    if(name.value.length < 4){return}
    if(pass.value.length < 4){return}
    await signup(name.value, pass.value)
    let user = await doSignIn()
    console.log(user)
    if(user){
      navigate('/')
    }else{
      navigate('/explore')
    }
  }

  return (
    <div className="auth">
      <div>
        <div>memos</div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" {...name} placeholder="叫个啥" />
          <input type="password" {...pass} placeholder="口令" />
          {systemStatus.host ? (
            <>
              <button onClick={handleSignin}>进来吧</button>
            </>
          ) : (
            <>
              <button onClick={handleHostActive}>站主激活</button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default Auth
