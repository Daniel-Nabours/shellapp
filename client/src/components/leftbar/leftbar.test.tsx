import { render } from "@testing-library/react"
import LeftBar from "./leftbar"

export { }

describe("The left side bar", () => {
  it("renders", ()=> {
    const { getByTestId } = render(<LeftBar />)
    expect(getByTestId("leftbarContainer")).toBeTruthy()
  })
})