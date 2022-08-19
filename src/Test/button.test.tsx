import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from "@testing-library/react";
import Button from "../Components/Button";


test("RENDER", () => {
    const mockHandle = jest.fn();
    const c = render(<Button name={"prueba"} active={false} handle={mockHandle} />);
    const button = c.getByText("prueba");
    fireEvent.click(button);
    expect(mockHandle).toHaveBeenCalledTimes(1);
})