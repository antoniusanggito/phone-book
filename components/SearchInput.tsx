import React, { FormEvent, useContext, useState } from 'react';
import {
  PaginationContext,
  PaginationContextType,
} from './context/paginationContext';

const SearchInput: React.FC = () => {
  const { setPagination } =
    (useContext(PaginationContext) as PaginationContextType) ?? {};
  const [input, setInput] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPagination({
      offset: 0,
      like: `%${input}%`,
    });
  };

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        id="search"
        value={input}
        onChange={handleChange}
        placeholder="Search Contact"
      />
      <input type="submit" />
    </form>
  );
};

export default SearchInput;
