import React, { useEffect, useRef, useState } from 'react';
import { ItemList } from '../ItemList/ItemList';
import { ShortItemProps } from '../ShortProductCard/ShortProductCard';
import logo from './favicon.svg';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const generateRandomItem = (): ShortItemProps => ({
  id: generateUUID(),
  img: logo,
  name: 'Товар ' + Math.floor(Math.random() * 100),
  price: Math.random() * 1000,
  description: 'test',
  count: 1,
});

export const ItemListContainer: React.FC = () => {
  const [items, setItems] = useState<ShortItemProps[]>(Array.from({ length: 1 }, generateRandomItem));
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          setItems((prev) => [...prev, ...Array.from({ length: 5 }, generateRandomItem)]);
          setLoading(false);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const observerRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <ItemList itemList={items} />
      {loading && <div>Загрузка...</div>}
      <div ref={observerRef} style={{ height: '2px', background: '#f0f0f0' }} />
    </>
  );
};

type ItemFilterType = {
  onSearch: (query: string) => void;
};

// 1. Controlled Input
export const ItemFilter: React.FC<ItemFilterType> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return <input type="text" value={query} onChange={handleChange} placeholder="Поиск товара..." />;
};

type ButtonType = {
  onClick: () => void;
  label: string;
};
// 2. JSX Spread Attributes
const Button = ({ onClick, label, ...props }: ButtonType) => (
  <button onClick={onClick} {...props}>
    {label}
  </button>
);

// 3. Merge Destructured Props with Other Values
const Item: React.FC<ShortItemProps> = ({ id, img, name, price, description, count, ...rest }) => {
  const itemClass = count > 0 ? 'in-stock' : 'out-of-stock';
  return (
    <div key={id} className={itemClass} {...rest}>
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <span>Цена: {price} руб.</span>
      <span>Количество: {count}</span>
    </div>
  );
};

// 4. Children Pass-through
const ItemListWithChildren: React.FC<{ items: ShortItemProps[]; children?: React.ReactNode }> = ({
  items,
  children,
}) => {
  return (
    <div>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
      {children}
    </div>
  );
};

// 5. Higher-Order Component (HOC)
const withLoadingIndicator =
  <T extends object>(Component: React.ComponentType<T>) =>
  (props: T) => {
    return (
      <>
        <Component {...props} />
        <div>Загрузка...</div>
      </>
    );
  };

const EnhancedItemList = withLoadingIndicator(ItemListWithChildren);

// 6. Array as Children
const ItemListWithArrayChildren: React.FC<{ children: React.ReactNode[] }> = ({ children }) => {
  return <div>{children}</div>;
};

// 7. Render Prop
const ItemRenderProp: React.FC<{ render: (item: ShortItemProps) => JSX.Element }> = ({ render }) => {
  const item = generateRandomItem();
  return render(item);
};
