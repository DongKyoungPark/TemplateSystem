export type TemplateElement = {
  id: string;
  type: 'text' | 'checkbox' | 'dropdown' | 'radio';
  label: string;
  required: boolean;
  options?: string[];
  defaultValue?: string | boolean | string[];
};

export type Template = {
  id: string;
  name: string;
  description: string;
  elements: TemplateElement[];
  createdAt: string;
  updatedAt: string;
};

export type TemplateStore = {
  templates: Template[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addTemplate: (
    template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updateTemplate: (id: string, template: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  getFilteredTemplates: () => Template[];
};
