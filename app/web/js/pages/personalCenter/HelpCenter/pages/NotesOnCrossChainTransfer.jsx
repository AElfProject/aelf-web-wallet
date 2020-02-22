/*
 * huangzongzhe
 * 2020.02.16
 */
import React, { Component } from 'react'
import NavNormal from '../../../NavNormal/NavNormal'
import style from './pages.scss'
import { FormattedMessage } from 'react-intl';
// React component
class NotesOnCrossChainTransfer extends Component {
  render() {
    return (
      <div>
        <NavNormal></NavNormal>
        <div className={style.textContainer}>
          <h2><FormattedMessage id = 'aelf.HelpTitle07' /></h2>
          <p><FormattedMessage id = 'aelf.Notes on cross chain transfer 1' /></p>
          <p><FormattedMessage id = 'aelf.Notes on cross chain transfer 2' /></p>
          <p><FormattedMessage id = 'aelf.Notes on cross chain transfer 3' /></p>
          <p><FormattedMessage id = 'aelf.Notes on cross chain transfer 4' /></p>
          <p><FormattedMessage id = 'aelf.Notes on cross chain transfer 5' /></p>
          <p><FormattedMessage id = 'aelf.Notes on cross chain transfer 6' /></p>
          <p><FormattedMessage id = 'aelf.Notes on cross chain transfer 7' /></p>
          <p><FormattedMessage id = 'aelf.Notes on cross chain transfer 8' /></p>
        </div>
      </div>
    );
  }
}

export default NotesOnCrossChainTransfer;
