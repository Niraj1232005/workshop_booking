import { render, screen } from '@testing-library/react';
import App from './App';

test('renders django integrated shell', async () => {
  render(<App />);

  expect(await screen.findByText(/your workshops/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /submit proposal/i })).toBeInTheDocument();
});
