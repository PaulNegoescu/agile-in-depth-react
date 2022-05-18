import { useCommsContext } from './CommsContext';

export function Child1() {
  const { message, handleMessage } = useCommsContext();
  return (
    <>
      <h1 className="text-2xl">Child1</h1>
      <h2 className="text-xl text-teal-800">{message}</h2>
      <button onClick={() => handleMessage('From child')}>
        Send from child
      </button>
    </>
  );
}
