import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setExpenses } from '../actions';

class ExpenseForm extends React.Component {
  state = {
    expense: {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    },
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(({ expense }) => ({
      expense: {
        ...expense,
        [name]: value,
      },
    }));
  };

  getExchangeRatesAPI = async () => {
    const api = 'https://economia.awesomeapi.com.br/json/all';
    const data = await (await fetch(api)).json();
    return data;
  };

  clearInput = () => {
    this.setState({
      expense: {
        value: 0,
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    });
  };

  createExpense = async () => {
    const { expense } = this.state;
    const { setExpense, amount } = this.props;
    const isExpenseNull = Object.values(expense).some((value) => value === '');
    if (isExpenseNull) {
      return console.log('Há campos não preenchidos');
    }
    const exchangeRates = await this.getExchangeRatesAPI();
    const newExpense = { id: amount.length, ...expense, exchangeRates };
    setExpense(newExpense);
    this.clearInput();
  };

  render() {
    const { currencies } = this.props;
    const { expense } = this.state;
    const { value, description } = expense;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            placeholder="Digite o valor"
          />
        </label>
        <label htmlFor="descricao">
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            placeholder="Digite uma descrição"
          />
        </label>
        <label htmlFor="currency">
          Moeda :
          <select name="currency" id="currency" onChange={ this.handleChange }>
            {currencies.map((coin, i) => (
              <option key={ i } value={ coin }>
                {coin}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="currency">
          Método de pagamento:
          <select name="method" data-testid="method-input" onChange={ this.handleChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="typeExpense">
          Tipo de despesa:
          <select
            name="tag"
            id="typeExpense"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.createExpense }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  amount: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  setExpense: (expense) => dispatch(setExpenses(expense)),
});

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  setExpense: PropTypes.func.isRequired,
  amount: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
