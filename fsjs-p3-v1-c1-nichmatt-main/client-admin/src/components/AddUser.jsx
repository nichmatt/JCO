import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionRegisterAdmin } from "../stores/action/actionCreator";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "Staff",
    phoneNumber: "",
    address: "",
  });

  const onChangeForm = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitForm = async () => {
    try {
      dispatch(actionRegisterAdmin(user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section id="addUser-Section">
        <div id="addUser-container">
          <h1>Add User</h1>
          <form onSubmit={submitForm}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={onChangeForm}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={onChangeForm}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChangeForm}
            />

            <select name="role" value={user.role} id="" onChange={onChangeForm}>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="text"
              name="phoneNumber"
              placeholder="PhoneNumber"
              onChange={onChangeForm}
            />

            <input
              type="text"
              name="address"
              placeholder="address"
              onChange={onChangeForm}
            />

            <button>Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddUser;
