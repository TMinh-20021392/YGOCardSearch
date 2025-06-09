import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from '../../src/components/SearchForm';

describe('SearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders all form fields', () => {
    render(<SearchForm onSearch={mockOnSearch} />);

    expect(screen.getByLabelText(/card name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/card type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/attribute/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/level\/rank/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/atk/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/def/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search cards/i })).toBeInTheDocument();
  });

  it('calls onSearch with form data on submit', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    await user.type(screen.getByLabelText(/card name/i), 'Blue-Eyes');
    await user.selectOptions(screen.getByLabelText(/card type/i), 'Effect Monster');
    await user.selectOptions(screen.getByLabelText(/attribute/i), 'LIGHT');
    await user.type(screen.getByLabelText(/level\/rank/i), '8');
    await user.type(screen.getByLabelText(/atk/i), '3000');
    await user.type(screen.getByLabelText(/def/i), '2500');

    await user.click(screen.getByRole('button', { name: /search cards/i }));

    expect(mockOnSearch).toHaveBeenCalledWith({
      fname: 'Blue-Eyes',
      type: 'Effect Monster',
      attribute: 'LIGHT',
      level: '8',
      atk: '3000',
      def: '2500'
    });
  });

  it('calls onSearch with empty object when no fields are filled', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    await user.click(screen.getByRole('button', { name: /search cards/i }));

    expect(mockOnSearch).toHaveBeenCalledWith({});
  });

  it('updates form state when input values change', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const nameInput = screen.getByLabelText(/card name/i);
    
    await user.type(nameInput, 'Dark Magician');
    expect(nameInput).toHaveValue('Dark Magician');

    await user.clear(nameInput);
    await user.type(nameInput, 'Blue-Eyes');
    expect(nameInput).toHaveValue('Blue-Eyes');
  });

  it('prevents default form submission', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={mockOnSearch} />);

    const form = screen.getByRole('button', { name: /search cards/i }).closest('form');
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    
    fireEvent(form!, submitEvent);

    expect(submitEvent.defaultPrevented).toBe(true);
  });
});
