import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import '../src/app/App.css';
import '../src/components/Header/Header.css';
import '../src/components/ProductList/ProductList.css';
import '../src/components/BasketList/BasketList.css';
import '../src/components/BasketRow/BasketRow.css';
import '../src/pages/ModalPage.css';
import '../src/styles/BasketPage.css';
import '../src/styles/HomePage.css';
import '../src/styles/ProductsPage.css';
import '../src/styles/ProfilePage.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    </BrowserRouter>
  ),
]; 