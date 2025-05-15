import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Model } from 'survey-core';
import 'survey-core/survey-core.css';
import { Survey } from 'survey-react-ui';

const SurveyPage = () => {
  const { id } = useParams();
  const [formJson, setFormJson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('survey_forms') || '{}');
    const selected = all[id];
    console.log(selected);
    if (selected) {
      setFormJson(selected?.form_data ?? {});
    }
  }, [id]);

  const alertResults = useCallback((survey) => {
    const results = JSON.stringify(survey.data, null, 2);
    toast.success(`Saved Data: \n\n${results}`);
  }, []);

  if (!formJson) {
    return <div className="p-6">Form not found.</div>;
  }

  const survey = new Model(formJson);

  survey.onComplete.add(alertResults);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <button onClick={() => navigate('/')} className="px-4 py-2 bg-slate-600 text-white rounded-md cursor-pointer">
        Back Home
      </button>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <Survey model={survey} />
      </div>
    </div>
  );
};

export default SurveyPage;
