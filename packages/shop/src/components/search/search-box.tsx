import React from 'react'
import { InputHTMLAttributes } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    label: string;
    onSubmit:(e) => void
}
const SearchBox: React.FC<Props> = () => {
  return (
    <div>SearchBox</div>
  )
}

export default SearchBox