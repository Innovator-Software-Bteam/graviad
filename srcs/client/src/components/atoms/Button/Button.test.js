import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('Button renders with correct text', () => {
    render(<Button>Test Button</Button>);
    const buttonElement = screen.getByText(/Test Button/i);
    expect(buttonElement).toBeInTheDocument();
});

test('Button is disabled when disabled prop is true', () => {
    render(<Button disabled={true}>Disabled Button</Button>);
    const buttonElement = screen.getByText(/Disabled Button/i);
    expect(buttonElement).toBeDisabled();
});

test('Button has correct className when passed', () => {
    render(<Button className="test-class">Button with class</Button>);
    const buttonElement = screen.getByText(/Button with class/i);
    expect(buttonElement).toHaveClass('test-class');
});

test('Button has correct size when passed', () => {
    render(<Button size="lg">Large Button</Button>);
    const buttonElement = screen.getByText(/Large Button/i);
    expect(buttonElement).toHaveClass('text-dashboard-theme/label/lg px-4 py-3 rounded-lg');
});

test('Button has correct color when passed', () => {
    render(<Button color="secondary">Secondary Button</Button>);
    const buttonElement = screen.getByText(/Secondary Button/i);
    expect(buttonElement).toHaveClass('!text-dashboard-theme/sys/dark/on-secondary-variant bg-dashboard-theme/ref/secondary/secondary-950');
});
test('Button has correct variant when passed', () => {
    render(<Button variant="text">Text Button</Button>);
    const buttonElement = screen.getByText(/Text Button/i);
    expect(buttonElement).toHaveClass('bg-transparent border-transparent');
});
test('Button has correct state when passed', () => {
    render(<Button state="inactive">Inactive Button</Button>);
    const buttonElement = screen.getByText(/Inactive Button/i);
    expect(buttonElement).toHaveClass('text-dashboard-theme/ref/secondary/secondary-800');
});
test('Button has correct is3DSimulated when passed', () => {
    render(<Button is3DSimulated={true}>3D Button</Button>);
    const buttonElement = screen.getByText(/3D Button/i);
    expect(buttonElement).toHaveClass('');
});
test('Button has correct compoundVariant when passed', () => {
    render(<Button variant="outlined" is3DSimulated={true}>Outlined Button</Button>);
    const buttonElement = screen.getByText(/Outlined Button/i);
    expect(buttonElement).toHaveClass('!shadow-none');
});