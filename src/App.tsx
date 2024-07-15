import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Header from './components/Header';
import ContributorProfile from './Pages/ContributorProfile';
import { devActivityInit } from './store/devActivity.thunk';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(devActivityInit() as unknown as any);
      } catch (err) {
        console.log("Error while fetching data:", err);
      }
    };
    fetchData();
  }, [dispatch]);

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
};

export default App;
