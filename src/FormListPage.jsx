import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    navigate(`/upsert/${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 flex-wrap justify-between mb-4">
        <h1 className="text-2xl font-bold">Saved Forms</h1>
        <button onClick={() => navigate('/')} className="px-4 py-2 bg-slate-600 text-white rounded-md cursor-pointer">
          Back Home
        </button>
      </div>
      <div className="grid gap-4">
        {Object.keys(forms).length === 0 && <p>No forms found.</p>}
        {Object.entries(forms).map(([id, json]) => (
          <div key={id} className="p-4 border rounded shadow-sm bg-white flex justify-between items-center">
            <div>
              <p className="font-semibold">{json.name || 'Untitled Form'}</p>
              <p className="text-sm text-gray-500">ID: {id}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleView(id)} className="px-4 py-2 bg-blue-500 text-white rounded">
                View
              </button>
              <button onClick={() => handleEdit(id)} className="px-4 py-2 bg-yellow-500 text-white rounded">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormListPage;
