import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tabulator } from 'survey-analytics/survey.analytics.tabulator';
import { Model } from 'survey-core';
import 'survey-analytics/survey.analytics.css';
import 'tabulator-tables/dist/css/tabulator.css';
import 'survey-analytics/survey.analytics.tabulator.css';
import jsPDF from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
applyPlugin(jsPDF);
import * as XLSX from 'xlsx';
import { IoArrowBack } from 'react-icons/io5';

const AnalyticsPage = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState();
  const [surveyDataTable, setSurveyDataTable] = useState();
  const forms = JSON.parse(localStorage.getItem('survey_forms') || '{}');
  const results = JSON.parse(localStorage.getItem('survey_results') || '{}');
  const navigate = useNavigate();

  const form = forms[id]?.form_data;
  const data = results[id] || [];

  if (!survey) {
    const survey = new Model(form);
    setSurvey(survey);
  }

  if (!surveyDataTable && !!survey) {
    const surveyDataTable = new Tabulator(survey, data, { jspdf: jsPDF, xlsx: XLSX });
    setSurveyDataTable(surveyDataTable);
  }

  useEffect(() => {
    surveyDataTable?.render('surveyDataTable');
    return () => {
      const surveyDataTableEl = document.getElementById('surveyDataTable');
      if (surveyDataTableEl) {
        surveyDataTableEl.innerHTML = '';
      }
    };
  }, [surveyDataTable]);

  return (
    <div className="p-6">
      <button onClick={() => navigate('/forms')} className="flex items-center gap-2 mb-4 px-4 py-2 bg-slate-600 text-white rounded-md cursor-pointer">
        <IoArrowBack />
        Back
      </button>
      <div id="surveyDataTable" />
    </div>
  );
};

export default AnalyticsPage;
