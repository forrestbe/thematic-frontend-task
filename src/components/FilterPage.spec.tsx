import React, { ReactNode } from 'react';
import { fireEvent, render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { FilterPage } from './FilterPage';
import { Auth0Provider } from '@auth0/auth0-react';
import { synopsisStub } from '../stubs/synopsisStub';

jest.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }: { children: ReactNode }) => children,
  useAuth0: () => {
    return {
      isLoading: false,
      getAccessTokenSilently: () => new Promise((resolve) => resolve("123")),
      user: { sub: "foobar" },
      isAuthenticated: true,
    }
  }
}));

jest.mock('../hooks/useFetch', () => ({
  useFetch: () => ({
    data: synopsisStub,
    isLoading: false,
    error: null
  })
}));

afterEach(() => {
  cleanup();
});

beforeEach(async () => {
  await render(
    <Auth0Provider domain='' clientId=''>
      <FilterPage />
    </Auth0Provider>
  );
});

describe('FilterPage', () => {
  it('Should render', async () => {

    await waitFor(() => {
      expect(screen.getByText('Filter Config')).toBeInTheDocument();
    })
  });

  it('Should display the column in a dropdown when Add Filter is clicked', async () => {
    const addFilterButton = await screen.findByText('Add filter');
    await fireEvent.click(addFilterButton);

    expect(screen.getByText('Airline Name')).toBeInTheDocument();
  });
});