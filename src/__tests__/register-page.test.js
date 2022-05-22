import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { RegisterPage } from "../components/pages";
import { renderWithProvider } from "./testUtils";
import userEvent from "@testing-library/user-event";
import trelloService from "../services/trello-service";

trelloService.postRegister = jest.fn();
const mockSetAuth = jest.fn();

describe("register page", () => {
  beforeEach(() => {
    renderWithProvider(<RegisterPage setAuth={mockSetAuth} />);
  });

  it("initial render", () => {
    const inputUsernameNode = screen.getByTestId("username");
    const inputEmailNode = screen.getByTestId("email");
    const inputPasswordNode = screen.getByTestId("password");

    expect(inputUsernameNode).toBeInTheDocument();
    expect(inputEmailNode).toBeInTheDocument();
    expect(inputPasswordNode).toBeInTheDocument();

    expect(inputUsernameNode.value).toEqual("");
    expect(inputEmailNode.value).toEqual("");
    expect(inputPasswordNode.value).toEqual("");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should display required error when value is invalid", async () => {
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(3);
    expect(mockSetAuth).not.toBeCalled();
    expect(trelloService.postRegister).not.toBeCalled();
  });

  it("should display min length error when value is invalid", async () => {
    const inputNodes = {
      username: screen.getByTestId("username"),
      email: screen.getByTestId("email"),
      password: screen.getByTestId("password"),
    };

    const values = {
      username: "loginlogin",
      email: "13124124@gmail.com",
      password: "12345",
    };

    await userEvent.type(inputNodes.username, values.username);
    await userEvent.type(inputNodes.email, values.email);
    await userEvent.type(inputNodes.password, values.password);

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockSetAuth).not.toBeCalled();
    expect(trelloService.postRegister).not.toBeCalled();
  });

  it("should display email error when value is invalid", async () => {
    const inputNodes = {
      username: screen.getByTestId("username"),
      email: screen.getByTestId("email"),
      password: screen.getByTestId("password"),
    };

    const values = {
      username: "loginlogin",
      email: "sdfdsfsdfsdfdsf",
      password: "12345asdasd",
    };

    await userEvent.type(inputNodes.username, values.username);
    await userEvent.type(inputNodes.email, values.email);
    await userEvent.type(inputNodes.password, values.password);

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect(mockSetAuth).not.toBeCalled();
    expect(trelloService.postRegister).not.toBeCalled();
  });

  it("should submit when values is valid", async () => {
    const inputNodes = {
      username: screen.getByTestId("username"),
      email: screen.getByTestId("email"),
      password: screen.getByTestId("password"),
    };

    const values = {
      username: "loginlogin",
      email: "asdasd@gmail.com",
      password: "password",
    };

    await userEvent.type(inputNodes.username, values.username);
    await userEvent.type(inputNodes.email, values.email);
    await userEvent.type(inputNodes.password, values.password);

    expect(inputNodes.username).toHaveValue(values.username);
    expect(inputNodes.email).toHaveValue(values.email);
    expect(inputNodes.password).toHaveValue(values.password);

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect(trelloService.postRegister).toBeCalledWith(values);
    expect(mockSetAuth).toBeCalledWith(true);
  });
});
