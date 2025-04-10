import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export const withRouter = (Story: React.ComponentType) => (
  <MemoryRouter initialEntries={['/']}>
    <Story />
  </MemoryRouter>
); 