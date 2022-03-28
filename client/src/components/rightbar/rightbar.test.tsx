import { render } from '@testing-library/react'
import RightBar from './rightbar'

describe("The right sidebar", () => {
  const { getByTestId } = render(<RightBar />)
  expect(getByTestId("rightBar")).toBeTruthy()
})