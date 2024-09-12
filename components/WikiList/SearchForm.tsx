import { SearchType } from './types/SearchType';
import useDebounce from '@/hooks/useDebounce';
import { useNavigate } from '@/hooks/WikiList/useNavigate';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSearch } from '@/contexts/SearchProvider';
import { useRouter } from 'next/router';

export default function SearchForm({ inputClassName, onAddKeyword }: SearchType) {
  const { searchTerm, onSearch } = useSearch();
  const [value, setValue] = useState<string>(searchTerm);
  const { navigateTo } = useNavigate();
  const router = useRouter();
  const { name } = router.query;

  const debouncedValue = useDebounce(value, 1000);

  //주소창에 검색어 쿼리치면 value값 변경
  useEffect(() => {
    if (typeof name === 'string') {
      setValue(name);
    }
  }, [name]);

  //debouncedValue이 searchTerm과 다를 때
  useEffect(() => {
    if (debouncedValue !== searchTerm) {
      onSearch(debouncedValue);
      onAddKeyword(debouncedValue);
      navigateTo(`/wikilist?name=${debouncedValue}`);
    }
  }, [debouncedValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input
        className={`${inputClassName} input input-search`}
        type="text"
        value={value}
        onChange={handleInputChange}
      />
    </>
  );
}
