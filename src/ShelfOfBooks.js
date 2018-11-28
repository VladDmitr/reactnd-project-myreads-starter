import React from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

const ShelfOfBooks = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelf.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.shelf.books.map((book) => (
                        <Book
                            key={book.id}
                            book={book}
                            moveBook={props.moveBook}
                        />
                    ))}
                </ol>
            </div>
        </div>
    )
};

ShelfOfBooks.propTypes = {
    moveBook: PropTypes.func.isRequired,
    shelf: PropTypes.object.isRequired
};

export default ShelfOfBooks