import classNames from 'classnames'
import './input.scss'

export interface InputProps extends React.HTMLProps<HTMLInputElement>{
    error?: string
}

const Input: React.FC<InputProps> = ({ value, placeholder, error, onChange}) => {
    return (
        <div className='input__container'>
            <input 
                className={classNames("input")}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}

export default Input;