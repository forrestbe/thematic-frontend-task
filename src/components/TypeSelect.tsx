import React from 'react';
import { Select } from "antd"
import styled from 'styled-components';

const Label = styled.label`
  font-size: 12px;
  margin-right: 12px;
  margin-bottom: 0;
`;

const FilterOptions = [
  {
    value: 'date',
    label: 'Date',
  },
  {
    value: 'default',
    label: 'Default',
  },
  {
    value: 'search',
    label: 'Search',
  },
  {
    value: 'score',
    label: 'Score'
  }
];

interface TypeSelectProps {
  onChange: (...event: any[]) => void;
  value: string;
}

const TypeSelect = ({ onChange, value }: TypeSelectProps) => {
  return (
    <div className="d-flex align-items-center">
      <Label>Type:</Label>
      <Select onChange={onChange} style={{ width: 150 }} value={value} options={FilterOptions} />
    </div>
  )
}

export { TypeSelect };