import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ cpu: 25, memory: 40, disk: 55 }),
    })
  );
});

test('shows an error when the backend is unavailable', async () => {
  global.fetch.mockRejectedValue(new Error('Backend unavailable'));

  render(<App />);

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Unable to reach the monitoring backend.'
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders the WatchOver dashboard', async () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /watchover/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /system status/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /^cpu$/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /memory/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /storage/i })).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByText('55%')).toBeInTheDocument();
  });
});
