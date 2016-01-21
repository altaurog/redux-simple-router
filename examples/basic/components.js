import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'

function mapStateToProps(state) {
    return { books: state.data.book }
}

export const App = connect(mapStateToProps)(function(props) {
    const { books, dispatch } = props

    function onBookSelect(sevent) {
        const bookId = sevent.target.value;
        if (bookId) {
            dispatch(routeActions.push('/book/' + bookId))
        } else {
            dispatch(routeActions.push('/'))
        }
    }

    return (
        <div>
            <BookSelect books={books} onBookSelect={onBookSelect}/>
            {props.children}
        </div>
    )
})

export function BookSelect(props) {
    return (
        <select onChange={props.onBookSelect}>
            <option key="" value="">Select a book</option>
            {props.books.map((book) =>
                <option key={book.book_id} value={book.book_id}>
                    {book.name}
                </option>
            )}
        </select>
    )
}


export function SidePanel(props) {
    const { routeParams } = props;
    return (
        <div>
            { routeParams.bookId && 'Book ' + routeParams.bookId }
        </div>
    )
}
