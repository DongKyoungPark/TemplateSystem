import { create } from 'zustand';
import { Template, TemplateStore } from '../types/template';

const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: [],
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),

  addTemplate: (template) => {
    const newTemplate: Template = {
      ...template,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      templates: [...state.templates, newTemplate],
    }));

    const templates = [...get().templates, newTemplate];
    localStorage.setItem('templates', JSON.stringify(templates));
  },

  updateTemplate: (id, updatedTemplate) => {
    set((state) => ({
      templates: state.templates.map((template) =>
        template.id === id
          ? {
              ...template,
              ...updatedTemplate,
              updatedAt: new Date().toISOString(),
            }
          : template
      ),
    }));

    const templates = get().templates;
    localStorage.setItem('templates', JSON.stringify(templates));
  },

  deleteTemplate: (id) => {
    set((state) => ({
      templates: state.templates.filter((template) => template.id !== id),
    }));

    const templates = get().templates.filter((template) => template.id !== id);
    localStorage.setItem('templates', JSON.stringify(templates));
  },

  getFilteredTemplates: () => {
    const { templates, searchQuery } = get();
    if (!searchQuery) return templates;

    return templates.filter((template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },
}));

const savedTemplates = localStorage.getItem('templates');
if (savedTemplates) {
  useTemplateStore.setState({ templates: JSON.parse(savedTemplates) });
}

export default useTemplateStore;
