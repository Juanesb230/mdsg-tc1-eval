import { render, screen } from '@testing-library/react'
import Input from './input'
import userEvent from '@testing-library/user-event'

describe('Input test', () => {
  const onChange = jest.fn()
  it('should render input text', () => {
    render(<Input onChange={onChange} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should render based on props', () => {
    render(<Input onChange={onChange} placeholder="test" value="test" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'test')
    expect(screen.getByRole('textbox')).toHaveValue('test')
  })

  it('should call onChange', () => {
    render(<Input onChange={onChange} />)
    const input = screen.getByRole('textbox')

    expect(onChange).toBeCalledTimes(0)

    userEvent.type(input, 'test')

    expect(onChange).toBeCalledTimes(4)
  })

})
