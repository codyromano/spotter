import React from 'react';
import styles from './Grid.scss';

export const GridContainer = (props) => (
  <div className="grid-container" {...props}>
    {props.children}
  </div>
);

export const GridCol = (props) => (
  <div className="grid-col" {...props}>{props.children}</div>
);

export const GridRow = (props) => (
  <div className="grid-row" {...props}>{props.children}</div>
);
