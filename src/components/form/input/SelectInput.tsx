interface SelectInputProps {
  choices: { id: string; label: string }[];
  defaultValue?: string;
  onChange: (newValue: string) => void;
}

export default function SelectInput({
  choices,
  defaultValue,
  onChange,
}: SelectInputProps) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      defaultValue={defaultValue}
    >
      {choices.map((choice) => (
        <option key={choice.id} value={choice.id}>
          {choice.label}
        </option>
      ))}
    </select>
  );
}
