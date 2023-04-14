import "./input.scss"

export interface InputProps extends React.HTMLProps<HTMLInputElement>{
    labelText?: string
}

const Input: React.FC<InputProps> = ({ value, placeholder, labelText, onChange }) => {
    return (
        <div className="input">
            <input
                className="input__box"
                value={value}
                placeholder={placeholder}
                onChange={onChange} 
            />
        </div>
    )
}

export default Input