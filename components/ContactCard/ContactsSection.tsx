import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import {
  GetFavContactsQuery,
  useGetRegContactsLazyQuery,
} from '../../generated/graphql';
import Card from '.';
import { FavContext, FavContextType } from '../context/favContext';
import {
  PaginationContext,
  PaginationContextType,
} from '../context/paginationContext';
import getFavIds from '../../utils/getFavIdQuery';
import { fullCenter } from '../../styles/commonStyles';
import PaginationButton from '../PaginationButton';
import { css } from '@emotion/react';

interface ContactsSectionProps {
  dataFav: GetFavContactsQuery;
}

const ContactsSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ContactsSection: React.FC<ContactsSectionProps> = ({ dataFav }) => {
  const { fav } = (useContext(FavContext) as FavContextType) ?? {};
  const { pagination, limit, page, setPagination } =
    (useContext(PaginationContext) as PaginationContextType) ?? {};

  const [
    getRegContacts,
    {
      data: dataReg,
      loading: loadingReg,
      error: errorReg,
      refetch: refetchReg,
    },
  ] = useGetRegContactsLazyQuery();

  useEffect(() => {
    getRegContacts({
      variables: {
        offset: pagination.offset,
        limit,
        favIds: getFavIds(fav),
        like: pagination.like,
      },
    });
  }, [pagination, fav]);

  const handlePrev = () => {
    setPagination((prev) => ({
      ...prev,
      offset: prev.offset - limit < 0 ? 0 : prev.offset - limit,
    }));
  };

  const handleNext = () => {
    setPagination((prev) => ({ ...prev, offset: prev.offset + limit }));
  };

  return (
    <>
      <ContactsSectionStyle>
        {/* {(loading || loadingFav) && <div css={fullCenter}>Loading...</div>} */}
        {errorReg && <div css={fullCenter}>{errorReg?.message}</div>}
        <h3>Favorites ({dataFav.contact.length})</h3>
        {dataFav.contact.map((contact: any) => (
          <Card
            key={contact.id}
            isFav={fav[contact.id]}
            id={contact.id}
            first_name={contact.first_name}
            last_name={contact.last_name}
            phones={contact.phones}
          />
        ))}
        <h3>Others</h3>
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
      </ContactsSectionStyle>

      {/* Pagination button */}
      {dataReg && (
        <section css={fullCenter}>
          <PaginationButton
            type="prev"
            onClick={handlePrev}
            disabled={page == 1}
          />
          <h4
            css={css`
              margin: 0 1rem;
            `}
          >
            {page}
          </h4>
          <PaginationButton
            type="next"
            onClick={handleNext}
            disabled={
              page * limit >=
              (dataReg.contact_aggregate.aggregate?.count as number)
            }
          />
        </section>
      )}
    </>
  );
};

export default ContactsSection;
