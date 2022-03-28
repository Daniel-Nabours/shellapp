import { render } from "@testing-library/react"
import HomePage from "./home"

describe("The home page", () => {
  it("renders", () => {
    const { getByTestId } = render(<HomePage />)
    expect(getByTestId("HomePage")).toBeTruthy()
  })

  it("Has a top bar", () => {
    const { getByTestId } = render(<HomePage />)
    expect(getByTestId("topbarContainer")).toBeTruthy()
  })
  it("Has a left side bar", () => {
    const { getByTestId } = render(<HomePage />)
    expect(getByTestId("leftbarContainer")).toBeTruthy()
  })
})