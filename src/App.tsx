import React, { useState, useEffect } from 'react';
import Dashboard from './Pages/Dashboard';
import Header from './components/Header';
import ContributorProfile from './Pages/ContributorProfile';
import { useDispatch, useSelector } from 'react-redux';
import { devActivityInit } from './store/devActivity.thunk';
import { Switch, Route } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const { activityMetadata, developersActivityData } = useSelector(state => state.app);
  const fetchData = async () => {
    try {
      await dispatch(devActivityInit());
    } catch (err) {
      console.log("error while fetching data");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <Switch>
      <Route component={Header} />
    </Switch>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/contributor" component={ContributorProfile} />
      </Switch>
    </>
  );
}

export default App;
