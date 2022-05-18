import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav, NotFound } from './components';
import { Login, Register } from './features/Auth';
import { AuthContextProvider } from './features/Auth/Auth.context';
import { Parent } from './features/Communication/Parent';

const Counter = lazy(() => import('./features/Counter/Counter'));
const StarWars = lazy(() => import('./features/StarWars/StarWars'));

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <div className="w-7/12 m-auto">
          <Routes>
            <Route path="/" element={<h1>Homepage</h1>} />
            <Route
              path="/starwars"
              element={
                <Suspense fallback={<>Loading ...</>}>
                  <StarWars />
                </Suspense>
              }
            />
            <Route
              path="/counter"
              element={
                <Suspense fallback={<>Loading ...</>}>
                  <Counter />
                </Suspense>
              }
            />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/communication" element={<Parent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
