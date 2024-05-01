import { render, screen } from '@testing-library/react';
import Profile from '../Profile';

test('Find text', () => {
    render(<Profile />);
    const linkElement = screen.getByText(/Profile statistics/i);
    expect(linkElement).toBeInTheDocument();
});
