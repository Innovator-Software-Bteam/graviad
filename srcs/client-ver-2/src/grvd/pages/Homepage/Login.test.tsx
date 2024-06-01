import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Login } from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Login Component', () => {
    it('should render without crashing', () => {
        render(<Router><Login /></Router>);
    });

    it('should display required error when value is invalid', async () => {
        const { getByPlaceholderText, getByText } = render(<Router><Login /></Router>);
        fireEvent.submit(getByText('Login'));

        await waitFor(() => {
            expect(getByPlaceholderText('Username')).toHaveAttribute('aria-invalid', 'true');
            expect(getByPlaceholderText('Password')).toHaveAttribute('aria-invalid', 'true');
        });
    });

    it('should display username after form submission', async () => {
        const { getByPlaceholderText, getByText } = render(<Router><Login /></Router>);
        fireEvent.input(getByPlaceholderText('Username'), {
            target: {
                value: 'testuser'
            }
        });
        fireEvent.input(getByPlaceholderText('Password'), {
            target: {
                value: 'testpassword'
            }
        });
        fireEvent.submit(getByText('Login'));

        await waitFor(() => {
            expect(getByPlaceholderText('Username')).toHaveValue('testuser');
        });
    });

    it('should navigate to Google auth when Google button is clicked', () => {
        const { getByText } = render(<Router><Login /></Router>);
        const googleButton = getByText('Google');
        fireEvent.click(googleButton);

        // Here you would typically expect a navigation event
        // This would be tested using a mock router
    });

    it('should navigate to Facebook auth when Facebook button is clicked', () => {
        const { getByText } = render(<Router><Login /></Router>);
        const facebookButton = getByText('Facebook');
        fireEvent.click(facebookButton);

        // Here you would typically expect a navigation event
        // This would be tested using a mock router
    });
});
export {}