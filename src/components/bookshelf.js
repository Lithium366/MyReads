import React from 'react';
import PropTypes from 'prop-types';
import { SHELVES, SHELVES_TITLES } from '../booksConstants';
import Book from './book';

class Bookshelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    bookshelf: PropTypes.oneOf(SHELVES),
    moveBook: PropTypes.func.isRequired
  };

  render() {
    const {
      props: {
        bookshelf,
        books,
        moveBook
      }
    } = this;

    return books.length ? (
      <div className="bookshelf">
        { bookshelf !== 'none' && (
          <h2 className="bookshelf-title">{ SHELVES_TITLES[bookshelf] }</h2>
        ) }
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.map((v) => (
              <li key={v.id}>
                <Book
                  book={v}
                  bookshelf={v.shelf || bookshelf}
                  moveBook={moveBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    ) : (<div></div>);
  }
}

export default Bookshelf;