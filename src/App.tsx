import { Provider } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store";
import LoginPage from "./components/auth/LoginForm";
import RegisterPage from "./components/auth/RegisterForm";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ErrorBoundary from "./components/common/ErrorBoundary";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import CreateMoviePage from "./pages/CreateMoviePage";
import EditMoviePage from "./pages/EditMoviePage";

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
                <Route path="/movies" element={<MovieListPage/>} />
                <Route path="/movies/:id" element={<MovieDetailPage/>} />
                <Route path="/movies/create" element={<CreateMoviePage/>}/>
                <Route path="/movies/:id/edit" element={<EditMoviePage/>} />
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
