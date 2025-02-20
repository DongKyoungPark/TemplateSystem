import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DeleteConfirmModal from '../DeleteConfirmModal';

describe('DeleteConfirmModal', () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();
  const itemName = 'Test Item';

  it('should not render when isOpen is false', () => {
    render(
      <DeleteConfirmModal
        isOpen={false}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        itemName={itemName}
      />
    );

    expect(screen.queryByText('Confirm Delete')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(
      <DeleteConfirmModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        itemName={itemName}
      />
    );

    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    expect(
      screen.getByText(`Are you sure to delete "${itemName}"?`)
    ).toBeInTheDocument();
  });

  it('should call onClose when Cancel button is clicked', () => {
    render(
      <DeleteConfirmModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        itemName={itemName}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onConfirm when Delete button is clicked', () => {
    render(
      <DeleteConfirmModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        itemName={itemName}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnConfirm).toHaveBeenCalled();
  });
});
