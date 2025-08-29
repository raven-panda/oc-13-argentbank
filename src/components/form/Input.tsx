import { useState } from 'react';
import styles from '../../assets/css/components/form.module.css';

interface InputProps<TValue> {
  defaultValue: TValue;
  name: string;
  label: string;
}

function Text({ defaultValue, name, label }: InputProps<string>) {
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <div className={styles.inputTextWrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={`#${name}`}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

function Checkbox({ defaultValue, name, label }: InputProps<boolean>) {
  const [value, setValue] = useState<boolean>(defaultValue);

  return (
    <div className={styles.inputCheckboxWrapper}>
      <input
        type="checkbox"
        id={`#${name}`}
        name={name}
        checked={value}
        onChange={(e) => setValue(e.target.checked)}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

const Input = {
  Text,
  Checkbox,
};

export default Input;
