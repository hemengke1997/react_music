import React, { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { debounce } from "utils/tools"
import { getSearchList } from "apis/search-api"

const SearchForm: React.FC = () => {
  const inputEl = useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = useState('')
  // 按条件搜索
  const _getSearchList = (query: string) => {
    if (!query) return
    getSearchList(query).then(res => {
      console.log(res)
    })
  }

  // 搜索防抖
  const handleQueryDebounce = useCallback(()=>{
    return debounce(_getSearchList, 1000)
  }, [])

  useEffect(()=>{
    handleQueryDebounce(query)
    // eslint-disable-next-line
  },[query])

  // 搜索输入时
  const handleChange = (e: any) => {
    let val = e.currentTarget.value
    setQuery(val)
  }

  // 清楚搜索
  const clearSearch = () => {
    if(inputEl && inputEl.current) {
      inputEl.current.value = ''
    }
  }

  const displayStyle = query ? {display: 'block'} : {display: 'none'}

  return (
    <form action="#" className="search_form search_form_bottom">
      <div className="inputcover">
        <i className="iconfont icon-sousuo"></i>
        <input
          type="text"
          name="search"
          className="input"
          placeholder="搜索歌手、歌曲、专辑"
          autoComplete="off"
          autoFocus
          ref={inputEl}
          onChange={handleChange}
        />
        <figure className="close" onClick={clearSearch} style={displayStyle}>
          <i className="iconfont icon-guanbi-"></i>
        </figure>
      </div>
    </form>
  )
}

export default React.memo(SearchForm)
