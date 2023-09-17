import React, { FormEvent, useContext, useEffect, useState } from 'react';
import {
  PaginationContext,
  PaginationContextType,
} from '../context/paginationContext';
import styled from '@emotion/styled';
import Image from 'next/image';
import Button from '../shared/Button';
import { css } from '@emotion/react';
import isWindow from '../../utils/scrollTop';

const FormStyle = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.25rem;

  input[type='text'] {
    width: 100%;
    height: 2.5rem;
    padding: 0 10px;
  }
`;

function initInput() {
  if (typeof window !== 'undefined') {
    const input = localStorage.getItem('PAGE');
    return input ? JSON.parse(input).like.slice(1, -1) : '';
  }
  return '';
}

const SearchInput: React.FC = () => {
  const { setPagination } =
    (useContext(PaginationContext) as PaginationContextType) ?? {};
  const [input, setInput] = useState<string>(initInput());
  const [showSearch, setShowSearch] = useState<string>('');

  useEffect(() => {
    setShowSearch(input);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPagination({
      offset: 0,
      like: `%${input}%`,
    });
    setShowSearch(input);
    isWindow() && window.scrollTo({ top: 0 });
  };

  const onEnter = (e: any) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <div
      css={css`
        margin-bottom: 1rem;
      `}
    >
      <FormStyle onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          id="search"
          value={input}
          onKeyUp={onEnter}
          onChange={handleChange}
          enterKeyHint="search"
          placeholder="Search contact"
        />
        <Button type="submit" role="secondary" h={40}>
          <Image
            src="/icons/search.svg"
            alt="Search Icon"
            width={16}
            height={16}
          />
        </Button>
      </FormStyle>
      {showSearch !== '' && (
        <h4
          css={css`
            font-weight: 400;
          `}
        >
          Showing results for &quot;{showSearch}&quot;
        </h4>
      )}
    </div>
  );
};

export default SearchInput;
