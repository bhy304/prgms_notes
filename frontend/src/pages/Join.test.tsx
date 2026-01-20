import { screen, fireEvent, waitFor } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { vi, describe, test, expect, beforeEach } from 'vitest'
import type { Mock } from 'vitest'
import JoinPage from './Join.tsx'
import { useJoin } from '@/hooks/useJoin'
import { renderWithRouter } from '@/test/test-utils'

// Mock dependencies
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

vi.mock('@/hooks/useJoin', () => ({
  useJoin: vi.fn(),
}))

describe('JoinPage', () => {
  const mockNavigate = vi.fn()
  const mockJoin = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useNavigate as Mock).mockReturnValue(mockNavigate)
    ;(useJoin as Mock).mockReturnValue({ join: mockJoin })
  })

  test('잘 렌더링된다.', () => {
    renderWithRouter(<JoinPage />)

    expect(
      screen.getByLabelText('이메일', { selector: 'input' }),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('비밀번호', { selector: 'input' }),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('비밀번호 확인', { selector: 'input' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('회원가입', { selector: 'button' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('로그인하기', { selector: 'a' }),
    ).toBeInTheDocument()
  })

  test('회원정보를 입력하고 회원가입 버튼을 누르면 join 함수가 호출된다.', async () => {
    mockJoin.mockResolvedValue({ result: 'success' })

    renderWithRouter(<JoinPage />)

    fireEvent.change(screen.getByLabelText('이메일'), {
      target: { value: 'foo@example.com' },
    })
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: '1234' },
    })
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
      target: { value: '1234' },
    })

    fireEvent.click(screen.getByText('회원가입', { selector: 'button' }))

    await waitFor(() => {
      expect(mockJoin).toHaveBeenCalledWith({
        email: 'foo@example.com',
        password: '1234',
      })
      expect(window.alert).toHaveBeenCalledWith('회원가입이 완료되었습니다.')
      expect(mockNavigate).toHaveBeenCalledWith('/login')
    })
  })

  test('비밀번호 확인을 다르게 입력하면 alert 창이 뜨고 join 함수가 호출되지 않는다.', async () => {
    renderWithRouter(<JoinPage />)

    fireEvent.change(screen.getByLabelText('이메일'), {
      target: { value: 'foo@example.com' },
    })
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: '1234' },
    })
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
      target: { value: '5678' },
    })

    fireEvent.click(screen.getByText('회원가입', { selector: 'button' }))

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        '비밀번호 확인이 일치하지 않습니다.',
      )
      expect(mockJoin).not.toHaveBeenCalled()
    })
  })

  test('이미 가입된 이메일로 가입을 시도하면 alert 창이 뜨고 페이지가 이동하지 않는다.', async () => {
    mockJoin.mockResolvedValue({ result: 'conflict' })

    renderWithRouter(<JoinPage />)

    fireEvent.change(screen.getByLabelText('이메일'), {
      target: { value: 'existing@example.com' },
    })
    fireEvent.change(screen.getByLabelText('비밀번호'), {
      target: { value: '1234' },
    })
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
      target: { value: '1234' },
    })

    fireEvent.click(screen.getByText('회원가입', { selector: 'button' }))

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('이미 가입된 이메일입니다.')
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })

  test('로그인하기 버튼을 누르면 로그인 URL로 이동한다.', () => {
    renderWithRouter(<JoinPage />)

    fireEvent.click(screen.getByText('로그인하기'))
    expect(window.location.pathname).toBe('/login')
  })
})
