import React from "react";

const Admin: React.FC = () => {
  return (
    <section className="hero is-primary is-large is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-size-1 has-text-white">Welcome back Boss</h1>
          <p className="subtitle is-size-4 has-text-white">
            Manage and edit Movies and TV Shows.
          </p>
          <a href="/mvadmin" className="button is-success is-large is-rounded is-shadowless">
            Manage Movies
          </a>
          <a href="/tvadmin" className="button is-info is-large is-rounded is-shadowless">
            Manage Shows
          </a>
        </div>
      </div>
    </section>
  );
};

export default Admin;