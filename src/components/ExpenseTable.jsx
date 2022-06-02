import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { newExpenses } from '../store/actions';
import './ExpenseTable.css';

class ExpenseTable extends Component {
  deleteExpense = (id) => {
    const { expenses, setExpenses } = this.props;
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr className="table-thead">
              <th scope="col">#</th>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Conversão</th>
              <t scope="col">Excluir</t>
            </tr>
          </thead>
          <tbody>
            {expenses.map(
              ({ id, method, value, currency, description, tag, exchangeRates }) => (
                <tr key={id}>
                  <th scope="row">{id + 1}</th>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name.split('/')[0]}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{(exchangeRates[currency].ask * value).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => this.deleteExpense(id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setExpenses: (arrayExpenses) => dispatch(newExpenses(arrayExpenses)),
});

ExpenseTable.propTypes = {
  expenses: propTypes.arrayOf(Object).isRequired,
  setExpenses: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
