import { useNavigate, Link } from 'react-router-dom'
import { useJoin } from '@/hooks/useJoin'

export default function JoinPage() {
  const navigate = useNavigate()
  const { join } = useJoin()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const passwordConfirm = formData.get('passwordConfirm') as string

    if (password !== passwordConfirm) {
      return alert('비밀번호 확인이 일치하지 않습니다.')
    }

    const { result } = await join({ email, password })
    if (result === 'conflict') {
      return alert('이미 가입된 이메일입니다.')
    }
    result satisfies 'success'
    alert('회원가입이 완료되었습니다.')
    navigate('/login')
  }

  return (
    <div className='py-[72px] px-6 text-center'>
      <h1 className='text-[32px] font-bold mb-8'>회원가입</h1>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        <div className='mb-4 text-left'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-1'>
            이메일
          </label>
          <input
            id='email'
            name='email'
            type='email'
            className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#212529] focus:outline-none'
            placeholder='example@email.com'
            required
          />
        </div>
        <div className='mb-4 text-left'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700 mb-1'>
            비밀번호
          </label>
          <input
            id='password'
            name='password'
            type='password'
            className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#212529] focus:outline-none'
            placeholder='••••••••'
            required
          />
        </div>
        <div className='mb-8 text-left'>
          <label
            htmlFor='passwordConfirm'
            className='block text-sm font-medium text-gray-700 mb-1'>
            비밀번호 확인
          </label>
          <input
            id='passwordConfirm'
            name='passwordConfirm'
            type='password'
            className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#212529] focus:outline-none'
            placeholder='••••••••'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-[#212529] text-white rounded-lg py-3 text-lg font-medium hover:bg-[#343a40] transition-colors mb-6'>
          회원가입
        </button>
      </form>
      <p className='text-[#868e96]'>
        이미 계정이 있으신가요?{' '}
        <Link to='/login' className='text-[#212529] font-medium underline'>
          로그인하기
        </Link>
      </p>
    </div>
  )
}
