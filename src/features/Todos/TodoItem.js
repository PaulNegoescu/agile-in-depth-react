import { IoTrashOutline } from 'react-icons/io5';

export function TodoItem({ item, onStatusChange, onDeleteItem }) {
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
        <button onClick={() => onDeleteItem(item.id)}>
          <IoTrashOutline />
        </button>
      </label>
    </li>
  );
}
