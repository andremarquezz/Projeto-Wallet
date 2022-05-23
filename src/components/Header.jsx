import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
    const { expenses } = this.props;
    const newTotal = expenses.reduce((acc, { currency, exchangeRates, value }) => {
      const fieldExpense = exchangeRates[currency].ask * value;
      acc += fieldExpense;
      return acc;
    }, 0);

    return (
      <div>
        <h3 data-testid="email-field">{userEmail}</h3>
        <p data-testid="total-field">{newTotal.toFixed(2)}</p>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: propTypes.string.isRequired,
  expenses: propTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
