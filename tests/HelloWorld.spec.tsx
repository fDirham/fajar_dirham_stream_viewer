import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import App from "../src/App";

test("Should render AI Chat", async () => {
  const { getByText } = await render(<App />);

  await expect.element(getByText("AI Chat")).toBeInTheDocument();
});
