import { render, screen } from "@testing-library/react";
import UserList from "../UserList";

test("renders without errors", () => {
  render(<UserList />);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
