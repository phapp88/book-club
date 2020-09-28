import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import AllBook from '../components/AllBook';
import Layout from '../components/Layout';
import TradeRequests from '../components/TradeRequests';
import TradeRequestBtns from '../components/TradeRequestBtns';

const styles = (theme) => ({
  books: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  main: {
    backgroundColor: 'white',
    margin: '55px',
    padding: '27.5px 55px',
  },
  title: {
    color: theme.palette.text.primary,
    margin: '27.5px 0 10px 0',
  },
});

class AllBooks extends React.Component {
  constructor(props) {
    super(props);
    const { books, trades } = this.props;
    this.state = {
      books,
      showAwaitingTrades: false,
      showSubmittedTrades: false,
      trades,
    };
    this.handleAcceptedOffer = this.handleAcceptedOffer.bind(this);
    this.handleRejectedOffer = this.handleRejectedOffer.bind(this);
    this.handleTradeOffer = this.handleTradeOffer.bind(this);
    this.toggleTradeRequests = this.toggleTradeRequests.bind(this);
  }

  handleAcceptedOffer(offer) {
    const { userId } = this.props;
    const { books, trades } = this.state;
    const nextBooks = books.map((book) =>
      book.id === offer.book.id
        ? { ...book, isAvailable: true, userId: offer.userId }
        : book,
    );
    this.setState({
      books: nextBooks,
      showAwaitingTrades: trades.awaitingApproval.length > 1,
      trades: {
        ...trades,
        awaitingApproval: trades.awaitingApproval.filter(
          (trade) => trade.book.id !== offer.book.id,
        ),
      },
    });
    fetch(`/api/trades/${offer.book.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ prevUserId: userId, nextUserId: offer.userId }),
    });
  }

  handleRejectedOffer(offer) {
    const {
      books,
      showAwaitingTrades,
      showSubmittedTrades,
      trades,
    } = this.state;
    const nextBooks = books.map((book) =>
      book.id === offer.book.id ? { ...book, isAvailable: true } : book,
    );
    this.setState({
      books: nextBooks,
      showAwaitingTrades:
        showAwaitingTrades && trades.awaitingApproval.length > 1,
      showSubmittedTrades: showSubmittedTrades && trades.submitted.length > 1,
      trades: {
        awaitingApproval: trades.awaitingApproval.filter(
          (trade) => trade.book.id !== offer.book.id,
        ),
        submitted: trades.submitted.filter(
          (trade) => trade.book.id !== offer.book.id,
        ),
      },
    });
    fetch(`/api/trades/${offer.book.id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }

  handleTradeOffer(tradeBook) {
    const { books, trades } = this.state;
    const nextBooks = books.map((book) =>
      book.id === tradeBook.id ? { ...book, isAvailable: false } : book,
    );
    this.setState({
      books: nextBooks,
      trades: {
        ...trades,
        submitted: trades.submitted.concat({ book: tradeBook }),
      },
    });
  }

  toggleTradeRequests(event) {
    const { showAwaitingTrades, showSubmittedTrades, trades } = this.state;
    const { awaitingApproval, submitted } = trades;
    const isSubmittedBtn =
      event.target.textContent.split(' ')[0] === 'Submitted';
    if (isSubmittedBtn) {
      if (submitted.length > 0) {
        this.setState({
          showAwaitingTrades: false,
          showSubmittedTrades: !showSubmittedTrades,
        });
      }
    } else if (awaitingApproval.length > 0) {
      this.setState({
        showAwaitingTrades: !showAwaitingTrades,
        showSubmittedTrades: false,
      });
    }
  }

  render() {
    const { classes, userId } = this.props;
    const {
      books,
      showAwaitingTrades,
      showSubmittedTrades,
      trades,
    } = this.state;
    return (
      <Layout userId={userId}>
        <div className={classes.main}>
          <TradeRequestBtns
            toggleTradeRequests={this.toggleTradeRequests}
            trades={trades}
          />
          {showSubmittedTrades && (
            <TradeRequests
              handleRejectedOffer={this.handleRejectedOffer}
              title="Submitted Trade Proposals"
              trades={trades.submitted}
            />
          )}
          {showAwaitingTrades && (
            <TradeRequests
              handleAcceptedOffer={this.handleAcceptedOffer}
              handleRejectedOffer={this.handleRejectedOffer}
              title="Offers Awaiting Approval"
              trades={trades.awaitingApproval}
            />
          )}
          <Typography className={classes.title} variant="h4">
            All Books
          </Typography>
          <Typography paragraph variant="subtitle1">
            Click a <i className="fas fa-exchange-alt" /> button to request a
            trade!
          </Typography>
          <div className={classes.books}>
            {books.map((book) => (
              <AllBook
                book={book}
                key={book.id}
                handleTradeOffer={this.handleTradeOffer}
                userId={userId}
              />
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

AllBooks.getInitialProps = async ({ query, req }) => {
  if (req) {
    const { books, trades } = query;
    const { user: userId } = req.session.passport;
    return { books, trades, userId };
  }
  const { userId } = query;
  const res = await fetch('/api/allbooks', { credentials: 'include' });
  const json = await res.json();
  const { books, trades } = json;
  return { books, trades, userId };
};

AllBooks.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      imgLink: PropTypes.string,
      title: PropTypes.string,
      userId: PropTypes.string,
    }),
  ).isRequired,
  classes: PropTypes.shape({
    books: PropTypes.string,
    main: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  trades: PropTypes.shape({
    awaitingApproval: PropTypes.arrayOf(PropTypes.object),
    submitted: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default withStyles(styles)(AllBooks);
