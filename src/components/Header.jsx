import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  calculatesExchange = () => {
    const { expenses } = this.props;
    return expenses;
  };

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{userEmail}</h3>
        <p data-testid="total-field">0</p>
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
