import ReactDOM from 'react-dom';
import { IoClose } from 'react-icons/io5';

function ModalPortal({ children }) {
  return ReactDOM.createPortal(children, document.getElementById('modal-root'));
}

export function Modal({ children, isShown, close }) {
  if (!isShown) {
    return null;
  }

  return (
    <ModalPortal>
      <div className="backdrop-blur-sm bg-black bg-opacity-50 fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
        <section className="rounded bg-white w-3/6 max-h-screen overflow-hidden relative">
          <button
            className="absolute top-0 right-0"
            onClick={() => {
              close();
            }}
          >
            <IoClose />
          </button>
          {children}
        </section>
      </div>
    </ModalPortal>
  );
}
