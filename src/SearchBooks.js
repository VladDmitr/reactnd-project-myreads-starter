import React, {Component} from 'react';
import PropTypes from 'prop-types'
import * as BooksAPI from "./BooksAPI";
import {Link} from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {
    state = {
        books: []
    };

    static propTypes = {
        moveBook: PropTypes.func.isRequired,
        shelvesOfBooks: PropTypes.object.isRequired
    };

    /**
     *
     * @param {string} keyword
     */
    searchBooks = (keyword) => {
        if (keyword.length >= 3) {
            const {shelvesOfBooks} = this.props;
            let myBooks = {};
            for (let key in shelvesOfBooks) {
                if (shelvesOfBooks.hasOwnProperty(key)) {
                    let books = shelvesOfBooks[key].books;
                    for (let i = 0; i < books.length; i++) {
                        myBooks[books[i].id] = key;
                    }
                }
            }

            BooksAPI.search(keyword).then((books) => {
                if (Array.isArray(books)) {
                    let result = [];
                    for (let i = 0; i < books.length; i++) {
                        if (myBooks.hasOwnProperty(books[i].id)) {
                            books[i].shelf = myBooks[books[i].id]
                        }
                        result.push(books[i]);
                    }
                    this.setState({books: result});
                } else {
                    this.setState({books: []});
                }
            });
        }
    };

    render() {
        const {moveBook} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                               onChange={(e) => this.searchBooks(e.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {Object.keys(this.state.books).map((key, index) => (
                            <Book
                                key={this.state.books[key].id}
                                book={this.state.books[key]}
                                moveBook={moveBook}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks