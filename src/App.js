import React from 'react';
import './assets/styles/sass/global.scss';

import { BrowserRouter } from "react-router-dom";
import RootRouter from "./router/RootRouter";
import ErrorBoundary from "./core/ErrorBoundary";
import { ApolloProvider } from "@apollo/client";
import { AjaxUtils } from "./utils/AjaxUtils"

function App() {
  return (
    <BrowserRouter>
        <ErrorBoundary >
            <ApolloProvider client={AjaxUtils}>
                <RootRouter />   
            </ApolloProvider>
        </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App;
