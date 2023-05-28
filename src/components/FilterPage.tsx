import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import Loading from './Loading';
import { Error } from './Error';
import { SynopsisColumn, SynopsisResponse } from '../model/synopsis';
import { Draggable, DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { Dropdown } from './Dropdown';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import { SettingFilled, DragOutlined, DeleteFilled } from '@ant-design/icons';
import { snakeToTitle } from '../utils/snakeToTitle';
import { TypeSelect } from './TypeSelect';
import { SelectedFiltersModal } from './SelectedFiltersModal';
import { SelectedFilter } from '../model/filter';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { SelectScoreModal } from './SelectScoreModal';

const Container = styled.div`
  max-width: 600px;
`;

const FilterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FilterListItem = styled.li`
  --border-color: rgb(240, 240, 235);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;

  &:first-child {
    border-top: 1px solid var(--border-color);
  }
`;

const FilterListInput = styled(Input)`
  max-width: 300px;
  margin-right: 20px;
`;

const DragIcon = styled(DragOutlined)`
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  display: flex;
  items-align: center;
  background: none;
  border: none;
`;

const SettingButton = styled.button`
  display: flex;
  items-align: center;
  background: none;
  border: none;
`;

type FormData = {
  selectedFilters: SelectedFilter[]
};

const FilterPage = () => {
  const [editingIndex, setEditingIndex] = useState<number>(0);
  const [showScoreModal, setShowScoreModal] = useState<boolean>(false);
  const [showSelectedFiltersModal, setShowSelectedFiltersModal] = useState<boolean>(false);
  const { data, isLoading, error } = useFetch<SynopsisResponse>('/synopsis');

  const { control, getValues } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      selectedFilters: []
    }
  });

  const { fields, append, remove, move } = useFieldArray({
    name: "selectedFilters",
    control
  });

  const handleAddFilter = (column: SynopsisColumn): void => {
    const { colType, sampleHeader } = column;
    const filter = {
      name: snakeToTitle(sampleHeader),
      type: colType,
      score: null,
    }

    append(filter);
  };

  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    move(result.source.index, result.destination.index);
  };

  const openScoreModal = (index: number): void => {
    if (getValues(`selectedFilters.${index}.type`) !== 'score') {
      return;
    }

    setEditingIndex(index);
    setShowScoreModal(true);
  };

  const handleScoreModalClose = (): void => {
    setShowScoreModal(false);
  };

  return (
    <>
      <header className="mb-4">
        <h1 className="mb-2">Filter Config</h1>
      </header>
      {isLoading && <Loading />}
      {(error && !data) && <Error message={error.message} />}
      {data && (
        <Container>
          <div className="mb-4">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <FilterList ref={provided.innerRef} {...provided.droppableProps}>
                    {fields.map(({ type, name }, index) => (
                      <Draggable key={name} index={index} draggableId={name}>
                        {(provided) => (
                          <FilterListItem ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="d-flex align-items-center">
                              <DragIcon rev='' />
                              <Controller
                                name={`selectedFilters.${index}.name`}
                                defaultValue={name}
                                control={control}
                                render={({ field }) => (
                                  <FilterListInput onChange={field.onChange} value={field.value} />
                                )}/>
                              <Controller
                                name={`selectedFilters.${index}.type`}
                                defaultValue={type}
                                control={control}
                                render={({ field }) => (
                                  <TypeSelect onChange={field.onChange} value={field.value} />
                                )}/> 
                            </div>
                            <div className="d-flex align-items-center">
                              <SettingButton onClick={() => openScoreModal(index)}>
                                <SettingFilled style={{ color: '#9CA3AF' }} rev='' />
                              </SettingButton>
                              <DeleteButton onClick={() => remove(index)} type="button">
                                <DeleteFilled style={{ color: '#DC2626' }} rev='' />
                              </DeleteButton>
                            </div>
                          </FilterListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </FilterList>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="d-flex justify-content-between">
            <Dropdown addFilter={handleAddFilter} columns={data.columns} />
            {getValues('selectedFilters').length > 0 && (
              <Button onClick={() => setShowSelectedFiltersModal(true)} type="primary">
                Save
              </Button>
            )}
          </div>
          <SelectedFiltersModal
            selectedFilters={getValues('selectedFilters')}
            showSelectedFiltersModal={showSelectedFiltersModal}
            setShowSelectedFiltersModel={setShowSelectedFiltersModal}
          />
          <SelectScoreModal
            control={control}
            editingIndex={editingIndex}
            showScoreModal={showScoreModal}
            afterClose={handleScoreModalClose}          
          />
        </Container>
      )}
    </>
  )
};

export { FilterPage };