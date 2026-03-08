import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import "../style/Home.css";

function Home() {
  const[loading, setLoading] =useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">

        <h1 className="fade-down">
          Welcome to Smart Notes 📝
        </h1>

        <p className="fade-up">
          Smart Notes is a simple and powerful note-taking application
          that helps you organize ideas, tasks, and important information
          in one place. Create notes, edit them anytime, and find them
          instantly using the search feature.
        </p>

        <div className="hero-buttons fade-up">

          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/signup")}>
            Signup
          </button>

        </div>

      </section>

      {/* Features Section */}
      <section className="features">

        <h2>Why Use Smart Notes?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>📌 Organize Ideas</h3>
            <p>
              Store all your important thoughts, tasks,
              and ideas in one place.
            </p>
          </div>

          <div className="feature-card">
            <h3>✏️ Create & Edit</h3>
            <p>
              Easily create notes and update them anytime.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔎 Smart Search</h3>
            <p>
              Quickly find notes using title or content search.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔐 Secure Access</h3>
            <p>
              Authentication ensures that only you
              can access your notes.
            </p>
          </div>

        </div>

      </section>

      {/* CTA Section */}
      <section className="cta">

        <h2>Start organizing your ideas today</h2>

        <p>
          Create your account and experience a smarter
          way to manage notes and stay productive.
        </p>

        <button onClick={() => navigate("/signup")}>
          Get Started 🚀
        </button>

      </section>

    </div>
  );
}

export default Home;