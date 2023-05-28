import React from 'react';

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <>
      <span>{message}</span>
    </>
  )
}

export { Error };