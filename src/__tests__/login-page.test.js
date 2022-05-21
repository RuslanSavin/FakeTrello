import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { LoginPage } from "../components/pages";
import { renderWithProvider } from "./testUtils";
import userEvent from "@testing-library/user-event";
import trelloService from "../services/trello-service";

trelloService.postLogin = jest.fn();
const mockSetAuth = jest.fn();

describe("login page", () => {
  beforeEach(() => {
    renderWithProvider(<LoginPage setAuth={mockSetAuth} />);
  });

  it("initial render", () => {
    const inputIdentifierNode = screen.getByTestId("identifier");
    const inputPasswordNode = screen.getByTestId("password");

    expect(inputIdentifierNode).toBeInTheDocument();
    expect(inputPasswordNode).toBeInTheDocument();

    expect(inputIdentifierNode.value).toEqual("");
    expect(inputPasswordNode.value).toEqual("");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should display required error when value is invalid", async () => {
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.queryAllByRole("alert")).toHaveLength(2);
    expect(mockSetAuth).not.toBeCalled();
    expect(trelloService.postLogin).not.toBeCalled();
  });

  it("should display min length error when value is invalid", async () => {
    const inputNodes = {
      identifier: screen.getByTestId("identifier"),
      password: screen.getByTestId("password"),
    };

    const values = {
      identifier: "loginlogin",
      password: "12345",
    };

    await userEvent.type(inputNodes.identifier, values.identifier);
    await userEvent.type(inputNodes.password, values.password);

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.queryAllByRole("alert")).toHaveLength(1);
    expect(mockSetAuth).not.toBeCalled();
    expect(trelloService.postLogin).not.toBeCalled();
  });

  it("should submit when values is valid", async () => {
    const inputNodes = {
      identifier: screen.getByTestId("identifier"),
      password: screen.getByTestId("password"),
    };

    const values = {
      identifier: "loginlogin",
      password: "password",
    };

    await userEvent.type(inputNodes.identifier, values.identifier);
    await userEvent.type(inputNodes.password, values.password);

    expect(inputNodes.identifier).toHaveValue(values.identifier);
    expect(inputNodes.password).toHaveValue(values.password);

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect(trelloService.postLogin).toBeCalledWith(values);
    expect(mockSetAuth).toBeCalledWith(true);
  });
});
