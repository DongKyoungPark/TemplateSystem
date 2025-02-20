import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import TemplateList from '../TemplateList';
import useTemplateStore from '../../store/templateStore';

vi.mock('../../store/templateStore', () => ({
  default: vi.fn(),
}));

describe('TemplateList', () => {
  const mockTemplates = [
    {
      id: '1',
      name: 'Template 1',
      description: 'Description 1',
      elements: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Template 2',
      description: 'Description 2',
      elements: [],
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02',
    },
  ];

  beforeEach(() => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    (useTemplateStore as any).mockImplementation(() => ({
      templates: mockTemplates,
      searchQuery: '',
      setSearchQuery: vi.fn(),
      deleteTemplate: vi.fn(),
      getFilteredTemplates: () => mockTemplates,
    }));
  });

  it('should render template list', () => {
    render(
      <BrowserRouter>
        <TemplateList />
      </BrowserRouter>
    );

    expect(screen.getByText('Template 1')).toBeInTheDocument();
    expect(screen.getByText('Template 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('should render search input', () => {
    render(
      <BrowserRouter>
        <TemplateList />
      </BrowserRouter>
    );

    expect(
      screen.getByPlaceholderText('Search templates...')
    ).toBeInTheDocument();
  });

  it('should render edit and preview links for each template', () => {
    render(
      <BrowserRouter>
        <TemplateList />
      </BrowserRouter>
    );

    mockTemplates.forEach(() => {
      expect(screen.getAllByText('Edit')).toHaveLength(mockTemplates.length);
      expect(screen.getAllByText('Preview')).toHaveLength(mockTemplates.length);
    });
  });

  it('should show "No templates found" when list is empty', () => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    (useTemplateStore as any).mockImplementation(() => ({
      templates: [],
      searchQuery: '',
      setSearchQuery: vi.fn(),
      deleteTemplate: vi.fn(),
      getFilteredTemplates: () => [],
    }));

    render(
      <BrowserRouter>
        <TemplateList />
      </BrowserRouter>
    );

    expect(screen.getByText('No templates found')).toBeInTheDocument();
  });
});
