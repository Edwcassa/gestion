import React from 'react'

export default function LoginPage() {

  const style = {
    imgborde: {
      "borderRadius": "1rem 0 0 1rem"
    },
    letter: {
      "letterSpacing": "1px"
    },
    borderadius: {
      "borderRadius": "1rem"
    },
    color: {
      "color": "#ff6219"
    },
  }
  return (
    <div>
      <section className=" background_login vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-5">
              <div className="card" style={style.borderadius}>
                <div className="row g-0">
                  <div className="d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                      <form>

                        <div className="d-flex align-items-center mb-3 pb-1">
                          <img src="https://i.postimg.cc/C1KdRcQd/logo.png" width='80px' alt="" />
                          <span className="h3 fw-bold mb-0 text-danger">Gestion-Academica</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={style.letter}>Inicie sesión en su cuenta</h5>

                        <div className="form-outline mb-4">
                          <input type="email" id="form2Example17" className="form-control form-control-lg" placeholder='Email address @unsaac' />
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" id="form2Example27" className="form-control form-control-lg" placeholder='Password' />
                        </div>

                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label" > Remember me </label>
                        </div>

                        <div className="pt-1 mb-4 mt-4">
                          <button className="btn btn-dark btn-lg btn-block" type="button">Login</button>
                        </div>

                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
