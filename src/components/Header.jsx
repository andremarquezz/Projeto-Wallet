import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './Header.css';
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
      <>
        <h3 className="h4">Total das despesas: R$ {newTotal.toFixed(2)}</h3>
        <p>{userEmail}</p>
      </>
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
