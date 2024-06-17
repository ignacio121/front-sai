import React from 'react';
import styled from 'styled-components';

const Pagination = ({ incidenciasPerPage, totalIncidencias, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalIncidencias / incidenciasPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {pageNumbers.map(number => (
        <PaginationItem key={number} active={number === currentPage}>
          <PaginationLink onClick={() => paginate(number)}>
            {number}
          </PaginationLink>
        </PaginationItem>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  padding: 0;
`;

const PaginationItem = styled.li`
  margin: 0 5px;
  padding: 10px;
  background-color: ${props => (props.active ? '#007bff' : '#f1f1f1')};
  color: ${props => (props.active ? '#fff' : '#000')};
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const PaginationLink = styled.a`
  text-decoration: none;
  color: inherit;
`;
