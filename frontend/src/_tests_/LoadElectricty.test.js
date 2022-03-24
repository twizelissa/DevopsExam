import { render, screen } from '@testing-library/react';
import LoadElectricty from "../pages/LoadElectricty";

test('Buy Load Electricty page', () => {
    render(<>
        <LoadElectricty />
    </>);
    
    const linkElement = screen.getByText(/Load Electricty/i);
    expect(linkElement).toBeInTheDocument();
});
