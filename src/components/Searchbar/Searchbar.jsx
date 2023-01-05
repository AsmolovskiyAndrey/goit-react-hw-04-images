import { Component } from 'react';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  handleSubmmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.name);
    this.setState({ name: '' });
  };

  inputChange = e => {
    this.setState({ name: e.currentTarget.value });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmmit}>
          <button type="submit" className={css.SearchForm_button}>
            <ImSearch size="20px" color="blue" />
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            value={this.state.name}
            onChange={this.inputChange}
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
