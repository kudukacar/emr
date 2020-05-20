import React from 'react';

const Splash = () => {
  return (
    <div className="splashpage">
      <div className="title">The EMR for independent physical therapists</div>
      <div className="subtitle">Spend less time on administration and more time with your clients</div>
      <div className={"benefits" + " " + "row"}>
        <div className={"benefit" + " " + "col"}>
          <i className="fas fa-shield-alt"></i>
          <div>HIPAA compliant</div>
        </div>
        <div className={"benefit" + " " + "col"}>
          <i className="fas fa-dollar-sign"></i>
          <div>Free</div>
        </div>
        <div className={"benefit" + " " + "col"}>
          <i className="far fa-smile"></i>
          <div>Easy to use</div>
        </div>
      </div>
    </div>
  )
}

export default Splash;