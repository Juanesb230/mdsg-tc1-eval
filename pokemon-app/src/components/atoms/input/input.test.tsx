import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./input";

describe("Input tests", () => {
  const onChange = jest.fn();
  it("should render input text base on props", () => {
    render(
      <Input onChange={onChange} placeholder="TEST PLACEHOLDER" value="TEST" />
    );
    expect(screen.getByRole("textbox")).toBeVisible();
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "TEST PLACEHOLDER"
    );
    expect(screen.getByRole("textbox")).toHaveValue("TEST");
  });

  it("should call onChange", async () => {
    render(
      <Input onChange={onChange} placeholder="TEST PLACEHOLDER" value="TEST" />
    );
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "TEST");
    expect(onChange).toHaveBeenCalled();
  });

  it("should render error message", () => {
    render(
      <Input
        onChange={onChange}
        placeholder="TEST PLACEHOLDER"
        value="TEST"
        error="TEST ERROR"
      />
    );
    expect(screen.getByText("TEST ERROR")).toBeVisible();
  });
});