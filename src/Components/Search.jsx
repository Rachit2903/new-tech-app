import React from 'react'
import { useGlobalContext } from './Context'

const Search = () => {
  const {query,searchPost}=useGlobalContext();
  return (
    <div>
      <h1>Rachit Anand News Website</h1>
      <form onSubmit={(e)=>e.preventDefault()}>
        <div>
          <input placeholder='Search Here' value={query} onChange={(e)=>searchPost(e.target.value)} />
        </div>
      </form>
    </div>
  )
}

export default Search
