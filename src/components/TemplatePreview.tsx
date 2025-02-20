import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTemplateStore from '../store/templateStore';
import type { Template } from '../types/template';

type FormData = {
  [key: string]: string | string[];
};

type TemplatePreviewProps = {
  template?: Partial<Template>;
};

const TemplatePreview = ({
  template: previewTemplate,
}: TemplatePreviewProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { templates } = useTemplateStore();
  const [template, setTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    if (previewTemplate) {
      setTemplate(previewTemplate as Template);
    } else if (id) {
      const foundTemplate = templates.find((t) => t.id === id);
      if (foundTemplate) {
        setTemplate(foundTemplate);
        const initialData: FormData = {};
        foundTemplate.elements.forEach((element) => {
          if (element.type === 'checkbox') {
            initialData[element.id] = (element.defaultValue as string[]) || [];
          } else {
            initialData[element.id] = (element.defaultValue as string) || '';
          }
        });
        setFormData(initialData);
      }
    }
  }, [id, templates, previewTemplate]);

  if (!template?.elements?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Template not found</p>
      </div>
    );
  }

  const handleInputChange = (elementId: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [elementId]: value,
    }));
  };

  const handleCheckboxChange = (
    elementId: string,
    option: string,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const currentValues = (prev[elementId] || []) as string[];
      if (checked) {
        return {
          ...prev,
          [elementId]: [...currentValues, option],
        };
      } else {
        return {
          ...prev,
          [elementId]: currentValues.filter((value) => value !== option),
        };
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-100 shadow rounded-lg p-6 border border-gray-400">
        <h1 className="text-2xl font-bold mb-2">
          {template.name || 'No title'}
        </h1>
        <p className="text-gray-600 mb-6">
          {template.description || 'No description'}
        </p>

        <form className="space-y-6">
          {template.elements.map((element) => (
            <div key={element.id} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {element.label || 'No label'}
                {element.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>

              {element.type === 'text' && (
                <textarea
                  rows={3}
                  value={(formData[element.id] as string) || ''}
                  onChange={(e) =>
                    handleInputChange(element.id, e.target.value)
                  }
                  required={element.required}
                  className="mt-1 w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={!!previewTemplate}
                />
              )}

              {element.type === 'checkbox' && (
                <div className="space-y-2">
                  {element.options?.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${element.id}-${index}`}
                        checked={(
                          (formData[element.id] as string[]) || []
                        ).includes(option)}
                        onChange={(e) =>
                          handleCheckboxChange(
                            element.id,
                            option,
                            e.target.checked
                          )
                        }
                        required={
                          element.required &&
                          ((formData[element.id] as string[]) || []).length ===
                            0
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        disabled={!!previewTemplate}
                      />
                      <label
                        htmlFor={`${element.id}-${index}`}
                        className="ml-2 text-gray-700"
                      >
                        {option || 'No option'}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {element.type === 'dropdown' && (
                <select
                  value={(formData[element.id] as string) || ''}
                  onChange={(e) =>
                    handleInputChange(element.id, e.target.value)
                  }
                  required={element.required}
                  className="mt-1 w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={!!previewTemplate}
                >
                  <option value="">Select an option</option>
                  {element.options?.map((option, index) => (
                    <option key={index} value={option}>
                      {option || 'No option'}
                    </option>
                  ))}
                </select>
              )}

              {element.type === 'radio' && (
                <div className="space-y-2">
                  {element.options?.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`${element.id}-${index}`}
                        name={element.id}
                        value={option}
                        checked={formData[element.id] === option}
                        onChange={(e) =>
                          handleInputChange(element.id, e.target.value)
                        }
                        required={element.required}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        disabled={!!previewTemplate}
                      />
                      <label
                        htmlFor={`${element.id}-${index}`}
                        className="ml-2 text-gray-700"
                      >
                        {option || 'No option'}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {!previewTemplate && (
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => navigate(`/edit/${template.id}`)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
              >
                Edit Template
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to List
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TemplatePreview;
