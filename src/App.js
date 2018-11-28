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
     * @param {string} bookId
     * @param {string} shelf
     */
    moveBook = (bookId, shelf) => {
        // The code below is commented out because the "BooksAPI.update" function does not work correctly
        // and returns the same "json" without changes.
        // @TODO uncomment when the "Books API.update" function works correctly

        // BooksAPI.update(bookId, shelf).then((shelvesOfBooks) => {
        //     console.log(shelvesOfBooks);
        //     let promises = [];
        //     for (let key in shelvesOfBooks) {
        //         if (shelvesOfBooks.hasOwnProperty(key)) {
        //             let books = shelvesOfBooks[key];
        //             for (let i = 0; i < books.length; i++) {
        //                 promises.push(BooksAPI.get(books[i]));
        //             }
        //         }
        //     }
        //
        //     Promise.all(promises).then(books => {
        //         let shelvesOfBooks = {...this.state};
        //         for (let key in shelvesOfBooks) {
        //             if (shelvesOfBooks.hasOwnProperty(key)) {
        //                 shelvesOfBooks[key].books = [];
        //             }
        //         }
        //         for (let i = 0; i < books.length; i++) {
        //             shelvesOfBooks[books[i].shelf].books.push(books[i]);
        //         }
        //         this.setState(shelvesOfBooks);
        //     }).catch(function (error) {
        //         console.log(error);
        //     });
        // });

        // Workaround for the book move function
        BooksAPI.update(bookId, shelf).then((shelvesOfBooks) => {
            BooksAPI.get(bookId).then(book => {
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
