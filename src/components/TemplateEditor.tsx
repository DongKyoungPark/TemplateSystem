const TemplateEditor = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={() => {}} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Template Name
          </label>
          <input
            type="text"
            value={''}
            onChange={() => {}}
            className="w-full px-4 py-2 border rounded-lg shadow-sm bg-white focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={''}
            onChange={() => {}}
            className="w-full px-4 py-2 border rounded-lg shadow-sm bg-white focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {}}
              className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              Add Text Field
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="px-3 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
            >
              Add Dropdown
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
            >
              Add Checkbox Group
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="px-3 py-2 bg-pink-100 text-pink-700 rounded-md hover:bg-pink-200"
            >
              Add Radio Group
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {}}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Template
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplateEditor;
