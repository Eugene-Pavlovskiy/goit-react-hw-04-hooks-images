import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import { BiSearch } from 'react-icons/bi';
import { toast } from 'react-toastify';

export default function SearchBar({ onSubmit }) {
  const [searchRequest, setSearchRequest] = useState('');

  function handleSearch(e) {
    setSearchRequest(e.currentTarget.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchRequest.trim() === '') {
      toast.error('Enter your search request, please', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    onSubmit(searchRequest);
    setSearchRequest('');
  }

  return (
    <header className={s.Searchbar} onSubmit={handleSubmit}>
      <form className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Seach</span>
          <BiSearch className={s.SearchIcon} />
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchRequest}
          onChange={handleSearch}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  searchRequest: PropTypes.string,
};