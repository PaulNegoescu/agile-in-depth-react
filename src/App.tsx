import { AnonymousLayout } from 'components/layouts';
import { Login } from 'features/Auth';
import { AuthContextProvider } from 'features/Auth/Auth.context';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<AnonymousLayout />}>
          <Route path="" element={<Login />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
