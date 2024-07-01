export default function Options({ options, className }) {
  return (
    <ul className="flex flex-col gap-1">
      {options.map((option) => (
        <li
          className={`flex flex-col gap-1 text-sm  w-fit p-1   ${className}`}
          key={option.id}
        >
          + {option.name}
        </li>
      ))}
    </ul>
  );
}
