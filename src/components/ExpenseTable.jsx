import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class ExpenseTable extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {expenses.map(
            ({ id, method, value, currency, description, tag, exchangeRates }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{currency}</td>
                <td>{exchangeRates[currency].ask}</td>
                <td>{(exchangeRates[currency].ask * value).toFixed(2)}</td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>
            ),
          )}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: propTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(ExpenseTable);
