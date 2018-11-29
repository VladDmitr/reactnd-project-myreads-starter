import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
    state = {
        currentlyReading: {
            title: 'Currently Reading',
            code: 'currentlyReading',
            books: []
        },
        wantToRead: {
            title: 'Want to Read',
            code: 'wantToRead',
            books: []
        },
        read: {
            title: 'Read',
            code: 'read',
            books: []
        }
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            let shelvesOfBooks = {...this.state};
            for (let i = 0; i < books.length; i++) {
                shelvesOfBooks[books[i].shelf].books.push(books[i]);
            }
            this.setState(shelvesOfBooks);
        })
    }

    /**
     *
     * @param {object} book
     * @param {string} shelf
     */
    moveBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then((books) => {
            book.shelf = shelf;
            let shelvesOfBooks = {...this.state};
            for (let key in shelvesOfBooks) {
                if (shelvesOfBooks.hasOwnProperty(key)) {
                    let books = shelvesOfBooks[key].books;
                    shelvesOfBooks[key].books = books.filter((b)=> b.id !== book.id);
                    if (book.shelf === key) {
                        shelvesOfBooks[key].books.push(book);
                    }
                }
            }
            this.setState(shelvesOfBooks);
        });
    };

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListBooks
                        moveBook={this.moveBook}
                        shelvesOfBooks={this.state}
                    />
                )}/>
                <Route exact path='/search' render={() => (
                    <SearchBooks
                        moveBook={this.moveBook}
                        shelvesOfBooks={this.state}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
