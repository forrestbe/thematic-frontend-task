import React from 'react';
import { Modal, Select } from 'antd';
import styled from 'styled-components';
import { Control, Controller } from 'react-hook-form';
import { SelectedFilter } from '../model/filter';

type FormData = {
  selectedFilters: SelectedFilter[]
};

const Label = styled.label`
  display: block;
  font-size: 12px;
  margin-right: 12px;
  margin-bottom: 6px;
`;

const ScoreOptions = [
  {
    value: 'average',
    label: 'Average',
  },
  {
    value: 'nps',
    label: 'NPS',
  },
  {
    value: 'threshold',
    label: 'Threshold',
  },
];

interface SelectScoreModalProps {
  editingIndex: number;
  control: Control<FormData, any>;
  showScoreModal: boolean;
  afterClose: () => void;
}

const SelectScoreModal = ({
  control,
  editingIndex,
  showScoreModal,
  afterClose,
}: SelectScoreModalProps) => {

  return (
    <Modal
      title="Selected Filters"
      open={showScoreModal}
      afterClose={() => afterClose()}
      onOk={() => afterClose()}
      onCancel={() => afterClose()}
    >
      <div className="pt-4 pb-4">
        <Label>Type:</Label>
        <Controller
          name={`selectedFilters.${editingIndex}.score`}
          defaultValue={null}
          control={control}
          render={({ field }) => (
            <Select onChange={field.onChange} style={{ width: 150 }} value={field.value} options={ScoreOptions} />
        )}/> 
      </div>
    </Modal>
  )
};

export { SelectScoreModal };