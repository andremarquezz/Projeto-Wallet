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
      exchangeRates: {},
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
    // const getRates = data.forEach((currency) => ({
    //   [currency.code]: {
    //     code: currency.code,
    //     name: currency.name,
    //     ask: currency.ask,
    //   },
    // }));
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
          <select name="currency" id="currency" onClick={ this.handleChange }>
            {currencies.map((coin, i) => (
              <option key={ i } value={ coin }>
                {coin}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="currency">
          Método de pagamento:
          <select name="method" data-testid="method-input" onClick={ this.handleChange }>
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="typeExpense">
          Tipo de despesa:
          <select
            name="tag"
            id="typeExpense"
            data-testid="tag-input"
            onClick={ this.handleChange }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
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
