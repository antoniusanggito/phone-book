import React, { useState } from 'react';

type Props = {};

const SearchInput: React.FC = () => {
  const [input, setInput] = useState<string>('');

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="search"
        id="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search Contact"
      />
      <input type="submit" />
    </form>
  );
};

export default SearchInput;
