import { render, screen } from '@testing-library/react';
import BuyElectricity from "../pages/BuyElectricty";

test('Buy Electricty page', () => {
    render(<>
        <BuyElectricity/>
    </>);
    
    const linkElement = screen.getByText(/Buy Electricty/i);
    
    expect(linkElement).toBeInTheDocument();
});


