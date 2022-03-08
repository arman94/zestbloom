import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { THEME_CONFIG, PUBLIC_ROUTE_CONFIG, PROTECTED_ROUTE_CONFIG } from 'configs';
import { Auth, MainRoute } from 'components/elements';
import { useSelector } from 'react-redux';
import WebSocketContainer from 'components/elements/webSocket';
import NotFound from 'components/shared/notFound';

function App() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return (
        <ThemeProvider theme={THEME_CONFIG}>
            <CssBaseline />
            <main className="main">
                <Auth />
                <WebSocketContainer isLoggedIn={isLoggedIn} />
                <Switch>
                    {isLoggedIn &&
                        PROTECTED_ROUTE_CONFIG.map((route, i) => <MainRoute key={i} {...route} />)}
                    {PUBLIC_ROUTE_CONFIG.map((route, i) => (
                        <MainRoute key={i} {...route} />
                    ))}
                    <Route render={(props) => <NotFound />} />
                </Switch>
            </main>
        </ThemeProvider>
    );
}

export default App;
