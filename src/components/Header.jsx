import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  state = {
    totalField: 0,
  };

  calculatesExchangeRates = () => {
    const { expenses } = this.props;
    expenses.forEach(({ currency, exchangeRates }) => {
      const { ask } = exchangeRates[currency];

      // this.setState((prevState) => {
      // totalField: prevState.totalField + Number(ask).toFixed(2);
      // });
    });
  };

  render() {
    this.calculatesExchangeRates();
    const { userEmail } = this.props;
    const { totalField } = this.state;
    return (
      <div>
        <h3 data-testid="email-field">{userEmail}</h3>
        <p data-testid="total-field">{totalField}</p>
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
