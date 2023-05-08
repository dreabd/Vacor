// frontend/src/components/LoginFormModal/index.js
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    let errors = {}

    if (credential.length < 4) errors["credentials"] = "Credentials need to have at least 4 characters"
    if (password.length < 6) errors["password"] = "Password needs to have more than 6 characters"

    setErrors(errors)
  }, [credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  console.log(errors)
  return (
    <div className="login-modal">
      <div className="logInText">
        <h1>Log In</h1>
      </div>

      <form className="loginForm" onSubmit={handleSubmit}>
        {errors.credential && (
          <p className="login-error">{errors.credential}</p>
        )}
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button disabled={Object.values(errors).length} className="login-button" type="submit">Log In</button>

      </form>
    </div>
  );
}

export default LoginFormModal;
