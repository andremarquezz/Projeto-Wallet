import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseForm extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="valor"
            placeholder="Digite o valor"
          />
        </label>
        <label htmlFor="descricao">
          <input
            data-testid="description-input"
            type="text"
            name="descricao"
            placeholder="Digite uma descrição"
          />
        </label>
        <label htmlFor="currency">
          Moeda :
          <select name="currency" id="currency">
            {currencies.map((currency, i) => (
              <option key={ i } value={ currency }>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="currency">
          Método de pagamento:
          <select name="pay" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="typeExpense">
          Tipo de despesa:
          <select name="typeExpense" data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(ExpenseForm);
