import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import FileList from './pages/FileList';
import FileDetail from './pages/FileDetail';
import UploadFile from './pages/UploadFile';
import ManageFiles from './pages/ManageFiles';
import Login from './pages/Login';
import './styles/colors.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="files" element={<FileList />} />
            <Route path="file/:id" element={<FileDetail />} />
            <Route path="upload" element={<UploadFile />} />
            <Route path="manage" element={<ManageFiles />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;