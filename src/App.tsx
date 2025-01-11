import { Provider } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store";
import LoginPage from "./components/auth/LoginForm";
import RegisterPage from "./components/auth/RegisterForm";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route>
                <Route path="/movies" />
                <Route path="/movies/:id" />
                <Route path="/movies/create" />
                <Route path="/movies/:id/edit" />
              </Route>
            </Route>

            <Route path="*" />
          </Routes>
        </Router>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
