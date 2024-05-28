import React from 'react'
import { Scrollbars, ScrollbarProps } from 'react-custom-scrollbars-2'

interface ScrollbarBoxProps extends ScrollbarProps {
  children: React.ReactNode
}

const CustomScrollbar: React.FC<ScrollbarBoxProps> = ({ children, ...props }) => {
  return (
    <Scrollbars style={{ height: '100%', ...props.style }} {...props}>
      {children}
    </Scrollbars>
  )
}

export default CustomScrollbar
