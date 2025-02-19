import { Link } from 'react-router-dom';

const TemplateList = () => {
  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search templates..."
          className="w-full px-4 py-2 border rounded-lg bg-white"
          value={''}
          onChange={() => {}}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-2">name</h3>
          <p className="text-gray-600 mb-4">description</p>
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Link
                to={`/edit/1`}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Edit
              </Link>
              <Link
                to={`/preview/1`}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
              >
                Preview
              </Link>
            </div>
            <button
              onClick={() => {}}
              className={
                'inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md'
              }
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateList;
