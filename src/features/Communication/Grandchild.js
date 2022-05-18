import { useCommsContext } from './CommsContext';

export function Grandchild() {
  const { message, handleMessage } = useCommsContext();
  return (
    <>
      <h1 className="text-xl">Grandchild</h1>
      <h2 className="text-blue-600">{message}</h2>
      <button onClick={() => handleMessage('From grandchild')}>
        Send from grandchild
      </button>
    </>
  );
}
