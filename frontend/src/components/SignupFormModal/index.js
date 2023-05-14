import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [validationErrors,setValidationErrors] = useState({})
  const [errors, setErrors] = useState({});
  const [submit, setSubmitted] = useState(false)
  const { closeModal } = useModal();

  const history = useHistory()


  useEffect(() => {
    const errs = {}

    if (!email.length) errs["email"] = "Email is required"
    if (!username.length) errs["username"] = "Username is required"
    if (username.length < 4) errs["username"] = "Username is required"
    if (!firstName.length) errs["firstName"] = "First name is required"
    if (!lastName.length) errs["lastName"] = "Last name is required"
    if (!password.length) errs["password"] = "Password is required"
    if (password.length < 6) errs["password"] = "Password is required"
    if (!confirmPassword.length) errs["confirmPassword"] = "Confirm password is required"


    // console.log(validationErrors)
    setErrors(errs)
  }, [email, username, firstName, password, confirmPassword])

//   console.log(errors)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .then(history.push("/"))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setSubmitted(true)
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <form className="signupForm" onSubmit={handleSubmit}>
        <h2 className="signupText">Sign Up</h2>
        <label>
          <span>Email {submit && errors.email && <span className="errors">{errors.email}</span>}</span>
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Username {submit && errors.username && <span className="errors">{errors.username}</span>}</span>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <span>
            First Name
            {submit && errors.firstName && <span className="errors">{errors.firstName}</span>}
          </span>
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>
            Last Name
            {submit && errors.lastName && <span className="errors">{errors.lastName}</span>}
          </span>
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>
            Password {submit && errors.password && <span className="errors">{errors.password}</span>}
          </span>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <span> Confirm Password</span>
          {submit && errors.confirmPassword && (<span className="errors">{errors.confirmPassword}</span>)}
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className="sign-up-button" disabled={Object.values(errors).length} type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
