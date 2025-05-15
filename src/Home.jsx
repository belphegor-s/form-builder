import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Form Builder</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(`/forms/create/${crypto.randomUUID()}`)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
          >
            <FaPlus />
            Create New Form
          </button>
          <button onClick={() => navigate('/forms')} className="flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-md shadow-md hover:bg-gray-900 transition">
            <FaRegEye />
            View All Forms
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
