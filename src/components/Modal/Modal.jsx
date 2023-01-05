import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    // console.log(e.code);
    if (e.code === 'Escape') {
      // console.log('Нажали Esc и я закрываю модалку');
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      // console.log('Кликнули в бэкдроп');
      this.props.closeModal();
    }
  };

  render() {
    const { img } = this.props;
    return createPortal(
      <div className={css.modal_backdrop} onClick={this.handleBackdropClick}>
        <div className={css.modal_content}>
          <img src={img} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  img: PropTypes.string.isRequired,
};
