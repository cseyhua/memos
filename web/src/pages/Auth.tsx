import useInput from '@/hooks/useInput'
import './Auth.less'

function Auth(){

  const name = useInput()
  const pass = useInput()

  return (
    <div className="auth">
      <div>
        <div>memos</div>
        <form className='form' onSubmit={e=>e.preventDefault()}>
          <input type='text' {...name} placeholder='叫个啥' />
          <input type='password' {...pass} placeholder='口令' />
          <button>进来吧</button>
        </form>
      </div>
    </div>
  )
}

export default Auth