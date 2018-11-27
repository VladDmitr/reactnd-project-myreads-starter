import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

class ShelfOfBooks extends Component {
    static propTypes = {
        moveBook: PropTypes.func.isRequired,
        shelf: PropTypes.object.isRequired,
    };

    render() {
        const {moveBook, shelf} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {shelf.books.map((book) => (
                            <Book
                                key={book.id}
                                book={book}
                                moveBook={moveBook}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default ShelfOfBooks