export function ErrorMessage({ children }) {
  return (
    <section className="border-2 border-red-800 bg-red-200 text-red-800 my-2 rounded">
      <header className="border-b-2 border-red-300 p-2">
        ⚠️ Oops! An error ocurred.
      </header>
      <div className="p-2">{children}</div>
    </section>
  );
}
