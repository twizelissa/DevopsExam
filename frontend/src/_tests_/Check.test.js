import { render, screen } from '@testing-library/react';
import Check from "../pages/Check";

test('Buy Check page', () => {
    render(<>
        <Check/>
    </>);
    
    const linkElement = screen.getByText(/Check Electricty/i);
    expect(linkElement).toBeInTheDocument();
});


test("Check Electricty Passes", () => {
    render(<>
        <Check/>
    </>);
    
    const inputElement = screen.getByTitle(/meter_number_input/i)
    inputElement.value = "1000"
    
    const buttonElement = screen.getByText(/Click to Check/i)
    buttonElement.click()
    
    const errorMessage = screen.getByTitle(/Error/i)
    
    expect(errorMessage).toBeInTheDocument();
})