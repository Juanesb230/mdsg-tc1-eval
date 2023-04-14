import React, { ChangeEvent } from 'react';
import styles from './styles/InputSeacrh.module.scss';
export interface InputSeacrhProps {
  placeholder: string;
  forHtml: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const InputSeacrh: React.FC<InputSeacrhProps> = ({
  placeholder,
  forHtml,
  onChange,
}: InputSeacrhProps) => {
  return (
    <div className={styles.inputseacrh}>
      <input
        type='input'
        className={styles.inputseacrh__field}
        placeholder={placeholder}
        onChange={onChange}
        name='name'
        id='name'
      />
      <label htmlFor='name' className={styles.inputseacrh__label}>
        {forHtml}
      </label>
    </div>
  );
};

export default InputSeacrh;
