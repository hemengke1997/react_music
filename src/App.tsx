import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { store } from './store';
import routes from './router'
import { GlobalStyle } from './App.style'




const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle/>
        {renderRoutes(routes)}
      </Router>
    </Provider>
  )
}

export default App