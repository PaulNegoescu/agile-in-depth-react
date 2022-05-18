import { useCommsContext } from './CommsContext';
import { Grandchild } from './Grandchild';

export function Child2() {
  const { message } = useCommsContext();
  return (
    <>
      <h1 className="text-2xl">Child2</h1>
      <h2 className="text-xl text-purple-800">{message}</h2>
      <Grandchild />
    </>
  );
}
