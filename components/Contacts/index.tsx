import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import {
  useGetFavContactsLazyQuery,
  useGetRegContactsLazyQuery,
} from '../../generated/graphql';
import Card from './Card';
import { FavContext, FavContextType } from '../context/favContext';
import {
  PaginationContext,
  PaginationContextType,
} from '../context/paginationContext';
import getFavIds from '../../utils/getFavIdQuery';
import { fullCenter } from '../../styles/commonStyles';
import { css } from '@emotion/react';
import PaginationContainer from './PaginationContainer';

const ContactsSectionStyle = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
`;

const ContactsSection: React.FC = () => {
  const { fav } = (useContext(FavContext) as FavContextType) ?? {};
  const { pagination, limit, page, setPagination } =
    (useContext(PaginationContext) as PaginationContextType) ?? {};

  // graphql queries
  const [
    getFavContacts,
    { data: dataFav, loading: loadingFav, error: errorFav },
  ] = useGetFavContactsLazyQuery();

  const [
    getRegContacts,
    { data: dataReg, loading: loadingReg, error: errorReg },
  ] = useGetRegContactsLazyQuery();

  useEffect(() => {
    getFavContacts({
      variables: { favIds: getFavIds(fav), like: pagination.like },
    });
    getRegContacts({
      variables: {
        offset: pagination.offset,
        limit,
        favIds: getFavIds(fav),
        like: pagination.like,
      },
    });
  }, [pagination, fav]);

  return (
    <>
      <ContactsSectionStyle>
        <div>
          {/* {(loadingReg || loadingFav) && <Loading />} */}
          {errorReg && <div css={fullCenter}>{errorReg?.message}</div>}
          {errorFav && <div css={fullCenter}>{errorFav?.message}</div>}
          <h3>Favorites ({dataFav?.contact.length})</h3>
          {dataFav?.contact.map((contact: any) => (
            <Card
              key={contact.id}
              isFav={fav[contact.id]}
              id={contact.id}
              first_name={contact.first_name}
              last_name={contact.last_name}
              phones={contact.phones}
            />
          ))}

          <h3
            css={css`
              margin-top: 1rem;
            `}
          >
            Others
          </h3>
          {dataReg?.contact.map((contact: any) => (
            <Card
              key={contact.id}
              isFav={fav[contact.id]}
              id={contact.id}
              first_name={contact.first_name}
              last_name={contact.last_name}
              phones={contact.phones}
            />
          ))}
        </div>

        {dataReg && <PaginationContainer dataReg={dataReg} />}
      </ContactsSectionStyle>
    </>
  );
};

export default ContactsSection;
