import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import('../layouts/HomePage'));

const AppRouter = () => {
    return (
        <React.Suspense fallback={<h1>Data is Loading... Please Wait...!!!</h1>}>
            <Switch>
                <Route path="/time-tracker" component={HomePage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </React.Suspense>
    )
}

export default AppRouter;