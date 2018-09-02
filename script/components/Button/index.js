import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.scss';

const Button = (props) => {
  if (props.to) {
    return (
      <Link className="button" to={props.to} {...props}>
        {props.children}
      </Link>
    );
  }
  return <button className="button" {...props}>{props.children}</button>
};

export default Button;
