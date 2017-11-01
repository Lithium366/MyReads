import React from 'react';
import PropTypes from 'prop-types';
import { SHELVES, SHELVES_TITLES } from '../booksConstants';

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    bookshelf: PropTypes.oneOf(SHELVES),
    moveBook: PropTypes.func.isRequired
  };

  render() {
    const {
      props: {
        book: {
          title,
          authors,
          id,
          imageLinks: {
            smallThumbnail
          },
        },
        bookshelf,
        moveBook
      }
    } = this;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${smallThumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select
              value={bookshelf}
              onChange={(e) => moveBook(this.props.book, e.target.value)}
            >
              <option value="moveTo" disabled>Move to...</option>
              { SHELVES.map((shelfName) => (
                <option
                  value={shelfName}
                  key={[id, shelfName].join('-')}
                >
                  { SHELVES_TITLES[shelfName] }
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        { authors && authors.length > 0 &&
          <div className="book-authors">{authors.join(', ')}</div>
        }
      </div>
    );
  }
}

export default Book;