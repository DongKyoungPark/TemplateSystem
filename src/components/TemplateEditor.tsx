import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTemplateStore from '../store/templateStore';
import type { Template, TemplateElement } from '../types/template';
import DeleteConfirmModal from './DeleteConfirmModal';
import { FaTrash } from 'react-icons/fa';

const TemplateEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { templates, addTemplate, updateTemplate } = useTemplateStore();

  const [template, setTemplate] = useState<Partial<Template>>({
    name: '',
    description: '',
    elements: [],
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [elementToDelete, setElementToDelete] =
    useState<TemplateElement | null>(null);

  useEffect(() => {
    if (id) {
      const existingTemplate = templates.find((t) => t.id === id);
      if (existingTemplate) {
        setTemplate(existingTemplate);
      }
    }
  }, [id, templates]);

  const addElement = (type: TemplateElement['type']) => {
    const newElement: TemplateElement = {
      id: crypto.randomUUID(),
      type,
      label: '',
      required: false,
      options:
        type === 'dropdown' || type === 'radio' || type === 'checkbox'
          ? ['']
          : undefined,
    };

    setTemplate((prev) => ({
      ...prev,
      elements: [...(prev.elements || []), newElement],
    }));
  };

  const updateElement = (
    elementId: string,
    updates: Partial<TemplateElement>
  ) => {
    setTemplate((prev) => ({
      ...prev,
      elements: prev.elements?.map((element) =>
        element.id === elementId ? { ...element, ...updates } : element
      ),
    }));
  };

  const removeElement = (elementId: string) => {
    setTemplate((prev) => ({
      ...prev,
      elements: prev.elements?.filter((element) => element.id !== elementId),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!template.name || !template.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (id) {
      updateTemplate(id, template);
    } else {
      addTemplate(template as Omit<Template, 'id' | 'createdAt' | 'updatedAt'>);
    }
    navigate('/');
  };

  const handleDeleteClick = (element: TemplateElement) => {
    setElementToDelete(element);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (elementToDelete) {
      removeElement(elementToDelete.id);
    }
    setDeleteModalOpen(false);
    setElementToDelete(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Template Name
          </label>
          <input
            type="text"
            value={template.name}
            onChange={(e) =>
              setTemplate((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={template.description}
            onChange={(e) =>
              setTemplate((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addElement('text')}
              className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 max-sm:text-xs"
            >
              Add Text Field
            </button>
            <button
              type="button"
              onClick={() => addElement('dropdown')}
              className="px-3 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 max-sm:text-xs"
            >
              Add Dropdown
            </button>
            <button
              type="button"
              onClick={() => addElement('checkbox')}
              className="px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 max-sm:text-xs"
            >
              Add Checkbox Group
            </button>
            <button
              type="button"
              onClick={() => addElement('radio')}
              className="px-3 py-2 bg-pink-100 text-pink-700 rounded-md hover:bg-pink-200 max-sm:text-xs"
            >
              Add Radio Group
            </button>
          </div>

          {template.elements?.map((element) => (
            <div
              key={element.id}
              className="border p-4 rounded-lg border-gray-400"
            >
              <div className="flex justify-between mb-4">
                <h3 className="font-bold text-blue-500">
                  {element.type.charAt(0).toUpperCase() + element.type.slice(1)}{' '}
                  Field
                </h3>
                <button
                  type="button"
                  onClick={() => handleDeleteClick(element)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <FaTrash size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Label
                  </label>
                  <input
                    type="text"
                    value={element.label}
                    onChange={(e) =>
                      updateElement(element.id, { label: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={element.required}
                    onChange={(e) =>
                      updateElement(element.id, { required: e.target.checked })
                    }
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded shadow-xl"
                  />
                  <label className="ml-2 block text-sm text-red-500">
                    Required field
                  </label>
                </div>

                {(element.type === 'dropdown' ||
                  element.type === 'radio' ||
                  element.type === 'checkbox') && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Options
                    </label>
                    <div className="space-y-2">
                      {element.options?.map((option, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(element.options || [])];
                              newOptions[index] = e.target.value;
                              updateElement(element.id, {
                                options: newOptions,
                              });
                            }}
                            className="block w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newOptions = element.options?.filter(
                                (_, i) => i !== index
                              );
                              updateElement(element.id, {
                                options: newOptions,
                              });
                            }}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newOptions = [...(element.options || []), ''];
                          updateElement(element.id, { options: newOptions });
                        }}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        Add Option
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {id ? 'Update Template' : 'Create Template'}
          </button>
        </div>
      </form>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={`${elementToDelete?.type || ''} field${
          elementToDelete?.label ? `: ${elementToDelete.label}` : ''
        }`}
      />
    </div>
  );
};

export default TemplateEditor;
