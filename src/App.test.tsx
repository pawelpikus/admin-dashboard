import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders without errors", () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello world!/i);
  expect(linkElement).toBeInTheDocument();
});
