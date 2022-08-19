import '@testing-library/jest-dom/extend-expect';
import { render } from "@testing-library/react";
import Bar from "../Components/Bar";


test("RENDER",()=>{
    const c = render(<Bar/>);
    c.getByText("HACKER NEWS");
})