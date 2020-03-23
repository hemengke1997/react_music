import React, { useRef, useState } from "react"
import { SearchWrapper } from "./style"
import SearchForm from './SearchForm'

const Search: React.FC = () => {
  
  return (
    <SearchWrapper>
      <SearchForm></SearchForm>
    </SearchWrapper>
  )
}

export default Search
