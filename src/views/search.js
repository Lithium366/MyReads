import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Bookshelf from '../components/bookshelf';
import * as BooksAPI from '../BooksAPI';

const mergeBooks = (books, userBooks = []) => (
  books.map((searchBook) => {
    const userBook = userBooks.filter((userBook) => (userBook.id === searchBook.id));
    if (userBook.length > 0) {
      searchBook.shelf = userBook[0].shelf;
    }
    return searchBook;
  })
);

class Search extends React.Component {
  static propTypes = {
    userBooks: PropTypes.array,
    moveBook: PropTypes.func.isRequired
  };

  state = {
    query: '',
    books: []
  };

  onSearch = (query) => {
    this.setState({ query });
    BooksAPI.search(query, 100)
      .then((books) => {
        this.setState({
          books: (books && books.length) ? mergeBooks(books, this.props.userBooks) : []
        });
      });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      books: mergeBooks(this.state.books, nextProps.userBooks)
    });
  }

  render() {
    const {
      state: {
        query,
        books
      },
      props: {
        moveBook
      }
    } = this;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={(e) => this.onSearch(e.target.value)}
              value={query}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <Bookshelf
            books={books}
            bookshelf="none"
            moveBook={moveBook}
          />
        </div>
      </div>
    );
  }
}

export default Search;