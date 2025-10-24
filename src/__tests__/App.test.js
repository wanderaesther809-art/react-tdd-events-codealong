import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "../App";

// Toppings checkbox
test("checkbox is initially unchecked", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  expect(addPepperoni).not.toBeChecked();
});

test("checkbox appears as checked when user clicks it", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
});

test("checkbox appears as unchecked when user clicks a second time", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
  userEvent.click(addPepperoni);
  expect(addPepperoni).not.toBeChecked();
});

// Size select element
test("size select element initially displays 'Small'", () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);
  expect(selectSize).toHaveDisplayValue("Small");
});

test("select Size dropdown displays the user's selected value", () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);
  userEvent.selectOptions(selectSize, "medium");
  expect(selectSize).toHaveDisplayValue("Medium");
  userEvent.selectOptions(selectSize, "large");
  expect(selectSize).toHaveDisplayValue("Large");
});

// Contact input
test("contact input updates when typing", async () => {
  render(<App />);
  const emailInput = screen.getByLabelText(/enter your email address/i);
  await userEvent.type(emailInput, "pizzafan@email.com");
  expect(emailInput).toHaveValue("pizzafan@email.com");
});

// Submit button
test("form contains a 'Submit Order' button", () => {
  render(<App />);
  expect(
    screen.getByRole("button", { name: /submit order/i })
  ).toBeInTheDocument();
});

test("clicking submit shows thank you message", async () => {
  render(<App />);
  const submitBtn = screen.getByRole("button", { name: /submit order/i });
  await userEvent.click(submitBtn);
  expect(screen.getByText(/thanks for your order!/i)).toBeInTheDocument();
});
