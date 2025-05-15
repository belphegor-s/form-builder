import { Routes, Route } from 'react-router-dom';
import SurveyCreatorPage from './SurveyCreatorPage';
import SurveyPage from './SurveyPage';
import FormListPage from './FormListPage';
import { Toaster } from 'react-hot-toast';
import Home from './Home';
import AnalyticsPage from './AnalyticsPage';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forms/create/:id" element={<SurveyCreatorPage />} />
        <Route path="/forms/edit/:id" element={<SurveyCreatorPage />} />
        <Route path="/forms" element={<FormListPage />} />
        <Route path="/forms/:id" element={<SurveyPage />} />
        <Route path="/analytics/:id" element={<AnalyticsPage />} />
      </Routes>
      <Toaster />
    </>
  );
}
