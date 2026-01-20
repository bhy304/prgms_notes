import { Link } from 'react-router-dom'
import MussgImage from '@/assets/mussg.svg?react'

export default function Home() {
  return (
    <div className='py-[72px] px-6 text-center'>
      <MussgImage className='h-[182px] mx-auto mb-10' />
      <h1 className='text-[48px] font-bold mb-5 leading-tight'>
        Programmers Note Editor
      </h1>
      <p className='text-[18px] font-normal mb-9'>
        <strong>Programmers Note Editor</strong>는 웹 브라우저에서 사용할 수
        있는 메모장 서비스입니다.
        <br />
        메모는 클라우드에 저장되어 언제 어디서나 접근할 수 있습니다.
      </p>
      <Link
        to='join'
        replace
        className='inline-block bg-[#212529] text-white rounded px-4 py-2 text-[18px] mb-9 no-underline hover:bg-[#343a40] active:bg-[#495057]'>
        무료로 시작하기
      </Link>
      <footer className='text-[14px] font-normal text-[#868e96]'>
        © 2025 Grepp Co.
      </footer>
    </div>
  )
}
