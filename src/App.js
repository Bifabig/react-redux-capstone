import { Routes, Route } from 'react-router-dom';
import BalanceSheets from './components/BalanceSheets';
import CompanySymbols from './components/CompanySymbols';
import Search from './components/Search';

const App = () => (
  <Routes>
    <Route path="/" element={<CompanySymbols />} />
    <Route path="/balanceSheets" element={<BalanceSheets />} />
    <Route path="/search" element={<Search />} />
  </Routes>
);

export default App;
