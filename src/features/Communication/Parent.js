import { Child1 } from './Child1';
import { Child2 } from './Child2';
import { CommsContextProvider } from './CommsContext';

export function Parent() {
  return (
    <>
      <h1 className="text-3xl">Parent</h1>
      <CommsContextProvider>
        <Child1 />
        <Child2 />
      </CommsContextProvider>
    </>
  );
}
