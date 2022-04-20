import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// root.render(
//   React.createElement(
//     'div',
//     {},
//     React.createElement('h1', {}, 'Titlu super duper 2!'),
//     React.createElement(
//       'ul',
//       { type: 'square' },
//       React.createElement(
//         'li',
//         { className: 'oClasa' },
//         'Ouyr first create Element.'
//       )
//     )
//   )
// );
