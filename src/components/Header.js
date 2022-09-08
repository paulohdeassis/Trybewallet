import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { tittle } = this.props;
    return (
      <h2>{tittle}</h2>
    );
  }
}

Header.propTypes = {
  tittle: PropTypes.string.isRequired,
};
export default Header;
