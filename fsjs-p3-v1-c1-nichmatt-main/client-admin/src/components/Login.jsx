import { useEffect, useState } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { actionLoginAdmin } from "../stores/action/actionCreator";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const toast = toast();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (event) => {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const login = async (event) => {
    // dispatch()
    try {
      event.preventDefault();
      console.log(form, "masuk login");
      await dispatch(actionLoginAdmin(form));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* {JSON.stringify(form)} */}
      <section id="login-section">
        <div className="login-container">
          <div className="login-content">
            <div
              className="login-form"
              style={{
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c2/New_jco_logo.png"
                alt="logo jco"
                style={{ width: "40px", marginLeft: "43%" }}
              />
              <h1 style={{ fontSize: "1.5rem", paddingTop: "10px" }}>J.CO</h1>
              <form>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={onChangeForm}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={onChangeForm}
                  required
                />
                <button onClick={login} type="submit">
                  Log in
                </button>
              </form>

              <div id="agreement">
                <p>By continuing, you agree to J.CO's Terms of Service</p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
}

export default App;
