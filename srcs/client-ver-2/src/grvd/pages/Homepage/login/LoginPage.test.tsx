import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LoginPage } from 'grvd/pages';
import { BrowserRouter as Router } from 'react-router-dom';

describe('LoginPage Component', () => {
    it('should render without crashing', () => {
        render(<Router><LoginPage /></Router>);
    });

    it('should navigate to Google auth when Google button is clicked', () => {
        const { getByText } = render(<Router><LoginPage /></Router>);
        const googleButton = getByText('Google');
        global.open = jest.fn();
        fireEvent.click(googleButton);
        expect(global.open).toHaveBeenCalledWith('http://localhost:8000/auth/google', '_blank');
    });

    it('should navigate to Facebook auth when Facebook button is clicked', () => {
        const { getByText } = render(<Router><LoginPage /></Router>);
        const facebookButton = getByText('Facebook');
        global.open = jest.fn();
        fireEvent.click(facebookButton);
        expect(global.open).toHaveBeenCalledWith('http://localhost:8=000/auth/facebook', '_blank');
    });
});