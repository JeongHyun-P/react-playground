import CommonAlert from './components/CommonAlert';
import CommonConfirm from './components/CommonConfirm';
import CommonToast from './components/CommonToast';
import { DialogProvider } from './context/DialogContext';
import './lib/ky'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <DialogProvider>
      <CommonToast />
      <CommonAlert />
      <CommonConfirm />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </DialogProvider>
  );
}

export default App;
