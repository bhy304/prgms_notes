import { useNavigate } from 'react-router-dom'
import { useJoin } from '@/hooks/useJoin'

export default function JoinPage() {
  const navigate = useNavigate()
  const { join } = useJoin()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const { result } = await join({ email, password })
    if (result === 'conflict') {
      return alert('이미 가입된 이메일입니다.')
    }
    result satisfies 'success'
    alert('회원가입이 완료되었습니다.')
    navigate('/login')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <input name='email' type='email' required />
        <input name='password' type='password' required />
        <button type='submit'>회원가입</button>
      </form>
    </div>
  )
}
