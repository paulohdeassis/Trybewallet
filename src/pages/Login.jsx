import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getMail } from '../redux/actions/getMail';

class Login extends React.Component {
  state = {
    isDisabled: true,
    emailValue: '',
    passwordValue: '',
  };

  onInputChange = ({ target }) => {
    const { value, type } = target;

    if (type === 'email') {
      this.setState({
        emailValue: value,
      });
    }
    if (type === 'password') {
      this.setState({
        passwordValue: value,
      });
    }
    this.handleValidation();
  };

  handleValidation = () => {
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]/;
    const passwordMinLength = 6;
    this.setState(({ passwordValue, emailValue }) => {
      if (passwordValue.length >= passwordMinLength && regex.test(emailValue)) {
        return { isDisabled: false };
      }
      return { isDisabled: true };
    });
  };

  onButtonClick = (event) => {
    event.preventDefault();
    const { emailValue } = this.state;
    const { data, history } = this.props;

    data(emailValue);

    history.push('/carteira');
  };

  render() {
    const { emailValue, passwordValue } = this.state;
    const { isDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ emailValue }
            onChange={ this.onInputChange }
          />
        </label>

        <label htmlFor="senha">
          Senha
          <input
            type="password"
            name="senha"
            data-testid="password-input"
            onChange={ this.onInputChange }
            value={ passwordValue }
          />
        </label>
        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ this.onButtonClick }
        >
          Entrar
        </button>
      </form>

    );
  }
}

Login.propTypes = {
  data: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  data: (user) => dispatch(getMail(user)),
});

export default connect(null, mapDispatchToProps)(Login);
