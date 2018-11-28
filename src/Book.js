import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
    shelves = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want to Read',
        read: 'Read',
        none: 'None'
    };

    static propTypes = {
        book: PropTypes.object.isRequired,
        moveBook: PropTypes.func.isRequired,
    };

    render() {
        const {book, moveBook} = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${book.imageLinks ? book.imageLinks.smallThumbnail : ''}")`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => moveBook(book.id, e.target.value)} defaultValue={book.shelf || 'none'} selected={book.shelf}>
                                <option value="move" disabled>Move to...</option>
                                {Object.keys(this.shelves).map((key, index) => (
                                    <option key={key} value={key} className={book.shelf === key ? 'green' : ''}>{this.shelves[key]}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
                </div>
            </li>
        )
    }
}

export default Book