import React, { useEffect, useState } from "react"

import { gql, GraphQLClient } from "graphql-request"
import PropTypes from "prop-types"

const Pagination = ({ CurrentPage, SetCurrentPage, IsLoading }) => {
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    const endpoints = "https://rickandmortyapi.com/graphql"
    const variables = {
      pagenum: CurrentPage,
    }

    const query = gql`
      query getData {
        characters {
          info {
            pages
          }
        }
      }
    `
    const client = new GraphQLClient(endpoints)
    client.request(query, variables).then((data) => {
      setTotalPages(data.characters.info.pages)
    })
  }, [CurrentPage])

  return (
    <div className="is-flex is-align-items-center">
      <button
        className="button mx-2"
        disabled={CurrentPage === 1 || IsLoading}
        onClick={() => {
          SetCurrentPage(CurrentPage - 1)
        }}
      >
        Prev
      </button>
      <p>{`${CurrentPage} of ${totalPages || " "}`}</p>
      <button
        className="button mx-2"
        disabled={CurrentPage === 42 || IsLoading}
        onClick={() => {
          SetCurrentPage(CurrentPage + 1)
        }}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination

Pagination.propTypes = {
  CurrentPage: PropTypes.number,
  IsLoading: PropTypes.bool,
  SetCurrentPage: PropTypes.func,
}
