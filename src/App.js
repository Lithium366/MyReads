import React from 'react';
import { Route } from 'react-router-dom';
import Search from './views/search';
import Main from './views/main';
import './App.css';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  moveBook = (book, shelf) => {
    const existingBook = this.state.books.filter((v) => (v.id === book.id));
    const _book = Object.assign({}, book, { shelf });

    this.setState({
      books: existingBook.length > 0
        ? this.state.books.map((v) => ((v.id === book.id) ? _book : v))
        : this.state.books.concat([_book])
    });
    BooksAPI.update(book, shelf);
  };

  componentWillMount() {
    BooksAPI.getAll()
      .then((resp) => {
        this.setState({
          books: resp
        });
      });
  }

  render() {
    const {
      state: {
        books
      }
    } = this;

    return (
      <div className="app">
        <Route exact path='/' render={ () => (
          <Main books={books} moveBook={this.moveBook} />
        )} />
        <Route path='/search' render={ () => (
          <Search userBooks={books} moveBook={this.moveBook} />
        )} />
      </div>
    );
  }
}

export default BooksApp;
