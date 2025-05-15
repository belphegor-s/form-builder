import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';

const FormListPage = () => {
  const [forms, setForms] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('survey_forms') || '{}');
    setForms(saved);
  }, []);

  const handleView = (id) => {
    navigate(`/forms/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/forms/edit/${id}`);
  };

  const handleAnalytics = (id) => {
    navigate(`/analytics/${id}`);
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this form?')) return;

    const updatedForms = { ...forms };
    delete updatedForms[id];
    setForms(updatedForms);
    localStorage.setItem('survey_forms', JSON.stringify(updatedForms));
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 flex-wrap justify-between mb-4">
        <h1 className="text-2xl font-bold">Saved Forms</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-md cursor-pointer">
            <IoArrowBack />
            Back Home
          </button>
          <button onClick={() => navigate(`/forms/create/${crypto.randomUUID()}`)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer">
            <FaPlus />
            Create
          </button>
        </div>
      </div>
      <div className="grid gap-4">
        {Object.keys(forms).length === 0 && <p className="text-center">No forms found</p>}
        {Object.entries(forms).map(([id, json]) => (
          <div key={id} className="p-4 border border-gray-300 rounded-md shadow-sm bg-white flex justify-between items-center">
            <div>
              <p className="font-semibold">{json.name || 'Untitled Form'}</p>
              <p className="text-sm text-gray-500 font-semibold">ID: {id}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleView(id)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                View
              </button>
              <button onClick={() => handleEdit(id)} className="px-4 py-2 bg-yellow-500 text-white rounded-md">
                Edit
              </button>
              <button onClick={() => handleAnalytics(id)} className="px-4 py-2 bg-purple-600 text-white rounded-md">
                Analytics
              </button>
              <button onClick={() => handleDelete(id)} className="px-4 py-2 bg-red-500 text-white rounded-md">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormListPage;
