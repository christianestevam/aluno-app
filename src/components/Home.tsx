import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const Home: React.FC = () => {
  return (
    <div>
      {/* INÍCIO DA BARRA DE NAVEGAÇÃO */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="www.bootstrap.com">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="http://www.bootstrap.com">
                  Home
                </a>
              </li>
              {/* INÍCIO DO MENU DROPDOWN */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Aluno
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/aluno/listar">
                      Listar Aluno
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/aluno/criar">
                      Criar Aluno
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/aluno/agrupado">
                      Alunos Agrupados por Curso
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
