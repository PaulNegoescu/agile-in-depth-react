import { Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from 'features/Auth/Auth.context';
import { Login, Register } from 'features/Auth';
import { AnonymousLayout } from 'layouts';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<AnonymousLayout />}>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
