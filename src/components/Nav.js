import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../features/Auth/Auth.context';
import { Link } from './styled-components';

export function Nav() {
  const { logout, user } = useAuthContext();

  return (
    <nav className="bg-slate-900 w-full">
      <ul className="flex text-white gap-2 w-7/12 m-auto">
        <li>
          <NavLink
            className={({ isActive }) =>
              `inline-block hover:underline py-2 pr-2 ${
                isActive && 'text-cyan-200'
              }`
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `inline-block hover:underline p-2 ${isActive && 'text-cyan-200'}`
            }
            to="/starwars"
          >
            Star Wars
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `inline-block hover:underline p-2 ${isActive && 'text-cyan-200'}`
            }
            to="/todos"
          >
            Todos
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `inline-block hover:underline p-2 ${isActive && 'text-cyan-200'}`
            }
            to="/counter"
          >
            Counter
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `inline-block hover:underline p-2 ${isActive && 'text-cyan-200'}`
            }
            to="/communication"
          >
            Comms
          </NavLink>
        </li>

        {user !== null && (
          <li className="ml-auto">
            Welcome {user.fName},
            <Link
              className="inline-block hover:underline p-2"
              to="/auth/login"
              // onClick={(e) => {
              //   e.preventDefault();
              //   logout();
              // }}
              onClick={logout}
            >
              Logout
            </Link>
          </li>
        )}

        {user === null && (
          <>
            <li className="ml-auto">
              <NavLink
                className={({ isActive }) =>
                  `inline-block hover:underline p-2 ${
                    isActive && 'text-cyan-200'
                  }`
                }
                to="/auth/login"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `inline-block hover:underline p-2 ${
                    isActive && 'text-cyan-200'
                  }`
                }
                to="/auth/register"
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
