import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Model } from 'survey-core';
import 'survey-core/survey-core.css';
import { Survey } from 'survey-react-ui';
import { IoArrowBack } from 'react-icons/io5';

const SurveyPage = () => {
  const { id } = useParams();
  const [formJson, setFormJson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('survey_forms') || '{}');
    const selected = all[id];
    if (selected) {
      setFormJson(selected?.form_data ?? {});
    }
  }, [id]);

  const alertResults = useCallback((survey) => {
    const results = survey.data;
    const existing = JSON.parse(localStorage.getItem('survey_results') || '{}');

    const updated = {
      ...existing,
      [id]: [...(existing[id] || []), results],
    };

    localStorage.setItem('survey_results', JSON.stringify(updated));
    toast.success('Survey results saved successfully!');
  }, []);

  if (!formJson) {
    return <div className="p-6">Form not found.</div>;
  }

  const survey = new Model(formJson);

  survey.onComplete.add(alertResults);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <button onClick={() => navigate('/forms')} className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-md cursor-pointer">
        <IoArrowBack />
        Back
      </button>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-4">
        <Survey model={survey} />
      </div>
    </div>
  );
};

export default SurveyPage;
