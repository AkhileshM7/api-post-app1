import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import RawJSON from "./components/RawJSON";
import PostTable from "./components/PostTable";
import { table } from "console";
import axios from "axios";

describe("Sample", () => {
  test("expecting to be true", () => {
    const isCo = true;
    expect(isCo).toBe(true);
  });
});

describe("test on RawJSON component", () => {
  test("test to find button", () => {
    render(
      <BrowserRouter>
        <RawJSON></RawJSON>
      </BrowserRouter>
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });
});

describe("PostTable component", () => {
  test("rendering PostTable component", () => {
    render(
      <BrowserRouter>
        <PostTable />
      </BrowserRouter>
    );
    screen.debug();
  });
});

// describe("PostTable Button", () => {
//   test("handle click", () => {
//     const submitButton = jest.fn();
//     render(
//       <BrowserRouter>
//         <PostTable onClick={submitButton} />
//       </BrowserRouter>
//     );
//     fireEvent.click(screen.getByRole("button"));
//     expect(submitButton).toHaveBeenCalledTimes(1);
//   });
// });

