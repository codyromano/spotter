import React from 'react';
import { GridContainer } from '../Grid';

// TODO: Use CSS modules
import styles from './Header.scss';

const Header = ({ title }) => (
  <header className="header">
    <GridContainer>
      <div class="header-content">
        {title}
      </div>
    </GridContainer>
  </header>
);

export default Header;
