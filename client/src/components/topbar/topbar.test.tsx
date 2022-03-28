import { render, waitFor } from "@testing-library/react"
import TopBar from "./topbar"
import userEvent from '@testing-library/user-event'


describe("The top bar", () => {
  describe("The search bar", () => {

    it("Has a search bar", () => {
      const { getByTestId } = render(<TopBar />)
      expect(getByTestId("searchBar")).toBeTruthy()
    })
    it("Accepts input", async () => { 
      const { getByTestId } = render(<TopBar />) 
      userEvent.type(getByTestId("searchBarInput"), "Test String") 
      await waitFor(() => { expect(getByTestId("searchBar").innerHTML).toContain("Test String") })
    })
    xit("allows user to search by post content", () => {
 
    })
  })
  xit("Has a profile button", () => {
    const { getByTestId } = render(<TopBar />)
    expect(getByTestId("profileButton")).toBeTruthy()

  })
  xit("Has a notification button", () => {
    const { getByTestId } = render(<TopBar />)
    expect(getByTestId("notificationButton")).toBeTruthy()

  })
  xit("Has a chat button", () => {
    const { getByTestId } = render(<TopBar />)
    expect(getByTestId("chatButton")).toBeTruthy()

  })
})