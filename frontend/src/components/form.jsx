import React from "react";

const Form = ({ signup, email, setEmail, password, setPassword, firstName, setFirstName, lastName, setLastName, error, handleSubmit }) => {
  return (
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6">
          <div className="login">{signup ? 'Start using SmartEMR' : 'Access SmartEMR'}</div>
          <form onSubmit={handleSubmit}>
            {signup && (<div className="form-group">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>)}
            {signup && (<div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>)}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
            </div>
            <div className="error">{error}</div>
            <input type="submit" className="btn btn-primary" aria-label="submit"/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;