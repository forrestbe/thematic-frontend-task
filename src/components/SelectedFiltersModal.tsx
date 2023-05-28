import React from 'react';
import { Modal, Table } from 'antd';
import { SelectedFilter } from '../model/filter';
import { firstLetterUppercase } from '../utils/snakeToTitle';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (value: string) => firstLetterUppercase(value)
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (value: string) => firstLetterUppercase(value)
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    render: (value: string) => {
      return value ? firstLetterUppercase(value) : '-'
    }
  },
];

interface SelectedFiltersModalProps {
  selectedFilters: SelectedFilter[];
  showSelectedFiltersModal: boolean;
  setShowSelectedFiltersModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectedFiltersModal = ({
  showSelectedFiltersModal,
  selectedFilters,
  setShowSelectedFiltersModel
}: SelectedFiltersModalProps) => {
  return (
    <Modal
      title="Selected Filters"
      open={showSelectedFiltersModal}
      onOk={() => setShowSelectedFiltersModel(false)}
      onCancel={() => setShowSelectedFiltersModel(false)}
    >
      <div className="pt-4 pb-4">
        <Table bordered dataSource={selectedFilters} columns={columns} size='small' pagination={false} />
      </div>
    </Modal>
  )
};

export { SelectedFiltersModal };