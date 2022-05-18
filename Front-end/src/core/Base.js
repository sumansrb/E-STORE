import React from "react"
import Menu from "./Menu"


const Base = ({
  title = "My Title",
  description = "My desription",
  className = "text-white p-4",
  children
}) => (
  <div>
      <Menu />
    <div className="container-fluid">
      <div className="jumbotron text-white text-center">
        <h2 className="display-4 color">{title}</h2>
        <p className="lead text-white">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-white">STORE</span> for Shopping
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
