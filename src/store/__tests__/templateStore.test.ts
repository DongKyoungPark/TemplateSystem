import { describe, it, expect, beforeEach } from 'vitest';
import useTemplateStore from '../templateStore';

describe('templateStore', () => {
  beforeEach(() => {
    useTemplateStore.setState({
      templates: [],
      searchQuery: '',
    });
  });

  it('should add a new template', () => {
    const template = {
      name: 'Test Template',
      description: 'Test Description',
      elements: [],
    };

    useTemplateStore.getState().addTemplate(template);
    const templates = useTemplateStore.getState().templates;

    expect(templates).toHaveLength(1);
    expect(templates[0]).toMatchObject({
      ...template,
      id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('should update an existing template', () => {
    const template = {
      name: 'Test Template',
      description: 'Test Description',
      elements: [],
    };
    useTemplateStore.getState().addTemplate(template);
    const templates = useTemplateStore.getState().templates;
    const templateId = templates[0].id;

    const updatedTemplate = {
      name: 'Updated Template',
      description: 'Updated Description',
    };
    useTemplateStore.getState().updateTemplate(templateId, updatedTemplate);

    const updatedTemplates = useTemplateStore.getState().templates;
    expect(updatedTemplates[0]).toMatchObject({
      ...updatedTemplate,
      id: templateId,
    });
  });

  it('should delete a template', () => {
    const template = {
      name: 'Test Template',
      description: 'Test Description',
      elements: [],
    };
    useTemplateStore.getState().addTemplate(template);
    const templates = useTemplateStore.getState().templates;
    const templateId = templates[0].id;

    useTemplateStore.getState().deleteTemplate(templateId);
    expect(useTemplateStore.getState().templates).toHaveLength(0);
  });

  it('should filter templates by search query', () => {
    const templates = [
      { name: 'Form A', description: 'Test', elements: [] },
      { name: 'Form B', description: 'Test', elements: [] },
      { name: 'Template C', description: 'Test', elements: [] },
    ];

    templates.forEach((template) => {
      useTemplateStore.getState().addTemplate(template);
    });

    useTemplateStore.getState().setSearchQuery('Form');
    const filteredTemplates = useTemplateStore
      .getState()
      .getFilteredTemplates();

    expect(filteredTemplates).toHaveLength(2);
    expect(filteredTemplates.map((t) => t.name)).toEqual(['Form A', 'Form B']);
  });
});
