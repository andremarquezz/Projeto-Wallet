import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getCurrenciesAPI } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    return (
      <>
        <div>TrybeWallet</div>
        <Header />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesAPI()),
});

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Wallet);
