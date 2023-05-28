import React, { useState } from 'react';
import styled from 'styled-components';
import { SynopsisColumn } from '../model/synopsis';
import { Button, Dropdown as AntDropdown, Popover, theme } from 'antd';
import { snakeToTitle } from '../utils/snakeToTitle';

const PopoverList = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
`;

const PopoverListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const PopoverContent = ({ sample }: { sample: string[] }) => {
  return (
    <PopoverList>
      {sample.sort().map((item) => (
        <PopoverListItem key={item}>{item}</PopoverListItem>
      ))}
    </PopoverList>
  )
}

const DropdownList = styled.ul`
  max-height: 350px;
  overflow-y: scroll;
  list-style: none;
  padding: 10px 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DropdownListItem = styled.li`
  padding: 0 10px;
`;

const DropdownListButton = styled.button`
  display: block;
  width: 100%;
  background-color: #fff;
  border: 0;
  text-align: left;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;

  &:first-letter {
    text-transform: uppercase;
  }
`;

interface DropdownProps {
  addFilter: (column: SynopsisColumn) => void;
  columns: SynopsisColumn[];
}

const Dropdown = ({ addFilter, columns }: DropdownProps) => {
  const { useToken } = theme;
  const { token } = useToken();
  const [showDropdown, setShowDropdown] = useState(false);

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const handleAddFilter = (column: SynopsisColumn) => {
    setShowDropdown(false);
    addFilter(column);
  }

  const sortColumns = (columns: SynopsisColumn[]): SynopsisColumn[] => {
    return columns.sort((a, b) => a.sampleHeader.localeCompare(b.sampleHeader));
  };

  return (
    <AntDropdown
      dropdownRender={() => (
        <DropdownList style={contentStyle}>
          {sortColumns(columns).map((column) => (
            <Popover key={column.sampleHeader} content={<PopoverContent sample={column.sample} />} placement="right" title="Sample data">
              <DropdownListItem>
                <DropdownListButton onClick={() => handleAddFilter(column)} type="button">
                  {snakeToTitle(column.sampleHeader)}
                </DropdownListButton>
              </DropdownListItem>
            </Popover>
          ))}
        </DropdownList>
      )}
      open={showDropdown}
    >
      <Button type="primary" onClick={() => setShowDropdown(!showDropdown)}>
        Add filter
      </Button>
    </AntDropdown>
  )
};

export { Dropdown };