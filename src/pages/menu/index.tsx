import React from 'react'
import Table from '../../components/table/table'
import { dummyMovies, movieHeaders } from '../../layout/config'



const MovieMenu = () => {
  return (
    <>
    <Table headers={movieHeaders} data={dummyMovies} />
    </>
  )
}

export default MovieMenu