import SurveyJS from '../components/SurveyJS';

export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">SurveyJS with Notion Database</h1>
          <SurveyJS />
        </div>
      </div>
    </main>
  );
}
