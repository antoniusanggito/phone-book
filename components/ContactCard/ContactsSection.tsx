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
  const { pagination, limit } =
    (useContext(PaginationContext) as PaginationContextType) ?? {};
  const favIds = getFavIds(fav);

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
    console.log(pagination);
    getRegContacts({
      variables: {
        offset: pagination.offset,
        limit,
        favIds,
        like: pagination.like,
      },
    });
  }, [pagination]);

  console.log(pagination, limit, dataReg);

  return (
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
  );
};

export default ContactsSection;
