import { NavLink } from 'react-router-dom';

export function Nav() {
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
            to="/auth/register"
          >
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
