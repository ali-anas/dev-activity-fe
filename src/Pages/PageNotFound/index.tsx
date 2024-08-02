import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="route-not-exist">
      <h1>Page not found!</h1>
      <Link to='/'>Go to dashbaord</Link>
    </div>
  )
}

export default PageNotFound;