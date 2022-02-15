import React, { lazy, Suspense } from "react";
import logo from './logo.svg';
import './App.css';
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import Button from "@mui/material/Button/Button";

const theme = createTheme();
const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React web
                </a>
            </header>
            <Button variant="contained">Contained</Button>
        </div>
    </ThemeProvider>
);

export default App;
