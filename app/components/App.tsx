import { useEffect } from 'react';
import * as styles from './App.module.scss';
import { Typography } from './common/Typography';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { TerminalPage } from './pages/TerminalPage';
import { DashboardPage } from './pages/DashboardPage';
// import '@uiw/github-corners';

export function App() {
  useEffect(() => {
    document.body.removeAttribute('unresolved');
  }, []);

  return (
    <BrowserRouter>
      {/* <github-corners href="https://github.com/rain-cafe/utils" color="#2f3640" fill="#f5f6fa" width={80} height={80} /> */}
      <div className={styles.app}>
        <Typography as={Link} type="h1" to="/">
          utils.gg
        </Typography>
        <Typography type="h2">Local only implementation of your favorite tools.</Typography>
        <Routes>
          <Route path="/">
            <Route index element={<DashboardPage />} />
            <Route path="terminal" element={<TerminalPage />} />
            {/* <Route path="pipes" element={<PipesPage />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
