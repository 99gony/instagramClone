import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { SearchWrapper } from './style';

const Search = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const onChangeSearchInput = useCallback((e)=>{
    setSearchInput(e.target.value);
  },[])
  const onSearch = useCallback(()=>{
    router.push(`/hashtag/${searchInput}`)
  },[searchInput])

  return(
    <SearchWrapper 
    value={searchInput} 
    onChange={onChangeSearchInput}
    onPressEnter={onSearch}
    prefix={<SearchOutlined />} 
    placeholder="검색" />
  )
}

export default Search;