import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className='py-[72px] px-6 text-center'>
      <h1 className='text-[32px] font-bold mb-8'>로그인</h1>
      <form className='max-w-md mx-auto'>
        <div className='mb-4 text-left'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            이메일
          </label>
          <input
            name='email'
            type='email'
            placeholder='example@email.com'
            className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#212529] focus:outline-none'
            required
          />
        </div>
        <div className='mb-8 text-left'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            비밀번호
          </label>
          <input
            name='password'
            type='password'
            placeholder='••••••••'
            className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#212529] focus:outline-none'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-[#212529] text-white rounded-lg py-3 text-lg font-medium hover:bg-[#343a40] transition-colors mb-6'>
          로그인
        </button>
      </form>
      <p className='text-[#868e96]'>
        계정이 없으신가요?{' '}
        <Link to='/join' className='text-[#212529] font-medium underline'>
          회원가입
        </Link>
      </p>
    </div>
  )
}
