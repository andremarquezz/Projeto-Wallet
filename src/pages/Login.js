import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input type="email" placeholder="Digite seu email" data-testid="email-input" />
          <input
            type="password"
            placeholder="Digite sua senha"
            data-testid="password-input"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
