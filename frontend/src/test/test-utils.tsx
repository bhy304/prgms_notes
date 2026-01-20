import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import type { ReactElement } from 'react'

/**
 * 테스트 코드에서 라우터 라이브러리(react-router-dom)를 사용하는 컴포넌트를
 * 렌더링할 때 사용하는 유틸리티 함수입니다.
 */
export function renderWithRouter(ui: ReactElement, { route = '/' } = {}) {
  // 브라우저의 히스토리 상태를 강제로 설정하여 특정 경로에 있는 상황을 모사합니다.
  window.history.pushState({}, 'Test page', route)

  // render 함수의 wrapper 옵션을 사용하여 ui를 BrowserRouter로 감쌉니다.
  return {
    ...render(ui, { wrapper: BrowserRouter }),
  }
}
