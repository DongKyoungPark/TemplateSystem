import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import TemplateList from './components/TemplateList';
import TemplateEditor from './components/TemplateEditor';
import TemplatePreview from './components/TemplatePreview';

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TemplateList />} />
            <Route path="/create" element={<TemplateEditor />} />
            <Route path="/edit/:id" element={<TemplateEditor />} />
            <Route path="/preview/:id" element={<TemplatePreview />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
