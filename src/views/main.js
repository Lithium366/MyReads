import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SHELVES } from '../booksConstants';
import Bookshelf from '../components/bookshelf';

export const Main = ({
  books,
  moveBook
}) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        { SHELVES.filter((v) => (v !== 'none')).map((bookshelf) => (
          <Bookshelf
            books={books.filter((v) => v.shelf === bookshelf)}
            bookshelf={bookshelf}
            key={bookshelf}
            moveBook={moveBook}
          />
        ))}
      </div>
    </div>
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);

Main.propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default Main;