import { useCallback, useEffect, useState } from 'react';
import { SurveyCreatorComponent, SurveyCreator } from 'survey-creator-react';
import 'survey-core/survey-core.css';
import 'survey-creator-core/survey-creator-core.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaRegEye } from 'react-icons/fa';
import { IoSaveOutline } from 'react-icons/io5';

const defaultCreatorOptions = {
  autoSaveEnabled: true,
  collapseOnDrag: true,
  showJSONEditorTab: false,
};

const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const SurveyCreatorPage = () => {
  const [creator, setCreator] = useState(null);
  const [formName, setFormName] = useState(`Untitled - ${getFormattedDate()}`);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const newCreator = new SurveyCreator(defaultCreatorOptions);

    const allForms = JSON.parse(localStorage.getItem('survey_forms') || '{}');
    const formData = allForms[id];

    if (formData) {
      newCreator.JSON = formData.form_data;
      setFormName(formData.name || `Untitled - ${getFormattedDate()}`);
    } else {
      setFormName(`Untitled - ${getFormattedDate()}`);
    }

    setCreator(newCreator);

    return () => {
      newCreator.dispose();
    };
  }, [id]);

  const handleSave = useCallback(
    (showToast = true) => {
      const surveyJson = creator.JSON;
      const allForms = JSON.parse(localStorage.getItem('survey_forms') || '{}');
      allForms[id] = {
        id,
        name: formName,
        form_data: surveyJson,
      };
      localStorage.setItem('survey_forms', JSON.stringify(allForms));
      if (showToast) {
        toast.success('Form Saved Successfully!');
      }
    },
    [creator?.JSON, id, formName]
  );

  useEffect(() => {
    if (!creator) return;

    const interval = setInterval(() => {
      if (creator.JSON) {
        handleSave(false);
      }
    }, 1 * 1000);

    return () => clearInterval(interval);
  }, [creator, handleSave]);

  if (!creator) {
    return <div className="min-h-screen w-full flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="p-2 border-b flex justify-between flex-wrap items-center gap-2">
        <div className="w-full max-w-[20em]">
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="Enter form name"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => navigate('/forms')} className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-md">
            <FaRegEye />
            View Forms
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md">
            <IoSaveOutline />
            Save Survey
          </button>
        </div>
      </div>
      <div className="flex-grow">
        <SurveyCreatorComponent creator={creator} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
};
export default SurveyCreatorPage;
