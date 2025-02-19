import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTemplateStore from '../store/templateStore';

const TemplateList = () => {
  const { searchQuery, setSearchQuery, deleteTemplate, getFilteredTemplates } =
    useTemplateStore();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (deleteConfirmId === id) {
      deleteTemplate(id);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(id);
    }
  };

  const filteredTemplates = getFilteredTemplates();

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search templates..."
          className="w-full px-4 py-2  rounded-lg bg-white shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
            <p className="text-gray-600 mb-4">{template.description}</p>
            <div className="flex justify-between items-center">
              <div className="space-x-2">
                <Link
                  to={`/edit/${template.id}`}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Edit
                </Link>
                <Link
                  to={`/preview/${template.id}`}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                >
                  Preview
                </Link>
              </div>
              <button
                onClick={() => handleDelete(template.id)}
                className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md ${
                  deleteConfirmId === template.id
                    ? 'text-red-700 bg-red-100 hover:bg-red-200'
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {deleteConfirmId === template.id ? 'Confirm Delete' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No templates found</p>
        </div>
      )}
    </div>
  );
};

export default TemplateList;
