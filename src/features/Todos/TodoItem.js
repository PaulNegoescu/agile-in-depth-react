export function TodoItem({ item, onStatusChange }) {
  return (
    <li>
      <input
        id={`todo${item.id}`}
        type="checkbox"
        defaultChecked={item.completed}
        onChange={(e) => onStatusChange(item.id, e.target.checked)}
        className="mr-2 peer"
      />
      <label htmlFor={`todo${item.id}`} className="peer-checked:line-through">
        {item.title}
      </label>
    </li>
  );
}
