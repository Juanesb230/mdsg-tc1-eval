import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './input'

describe('Input component', () => {
  const onChange = jest.fn()
  it('should render input by role', () => {
    render(<Input placeholder="Nombre" />)
    const inputFound = screen.getByRole('textbox')
    expect(inputFound).toBeInTheDocument()
  })

  it('should call onChange', () => {
    
    render(<Input onChange={onChange} />)
    const input = screen.getByRole('textbox')
    expect(onChange).toBeCalledTimes(0)
    userEvent.type(input, 'test')
    expect(onChange).toBeCalledTimes(4)
  })

  it('should render based on props', () => {
    render(<Input onChange={onChange} placeholder="test" value="test" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'test')
    expect(screen.getByRole('textbox')).toHaveValue('test')
  })
  
})