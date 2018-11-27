import React, {Component} from 'react';
import PropTypes from 'prop-types'
import ShelfOfBooks from './ShelfOfBooks'
import {Link} from 'react-router-dom'

class ListBooks extends Component {
    static propTypes = {
        moveBook: PropTypes.func.isRequired,
        shelvesOfBooks: PropTypes.object.isRequired
    };

    render() {
        const {moveBook, shelvesOfBooks} = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {Object.keys(shelvesOfBooks).map((key, index) => (
                            <ShelfOfBooks
                                key={key}
                                moveBook={moveBook}
                                shelf={shelvesOfBooks[key]}
                            />
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks