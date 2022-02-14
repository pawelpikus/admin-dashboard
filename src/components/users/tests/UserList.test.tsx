import { render, screen } from "@testing-library/react";
import UserList from "../UserList";

test("renders without errors", () => {
  render(<UserList />);
  const component = screen.getByText(/Dashboard/i);
  expect(component).toBeInTheDocument();

  const addBtn = screen.getByRole("button", { name: /add user/i });
  expect(addBtn).toBeInTheDocument();
});
