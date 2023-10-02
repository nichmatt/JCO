import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../stores/action/actionCreator";
import { useDispatch } from "react-redux";

function AddCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
  });

  const onChangeForm = (event) => {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const addCategories = (event) => {
    event.preventDefault();
    console.log("masuk addcategories");
    dispatch(
      addCategory({
        name: form.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    navigate("/category");
  };
  return (
    <>
      {/* {JSON.stringify(form)} */}
      <section id="categoryform-section">
        <div className="categoryform-container">
          <div className="categoryform-content">
            <div
              className="category-form"
              style={{
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c2/New_jco_logo.png"
                alt="logo jco"
                style={{ width: "40px", marginLeft: "1%" }}
              />
              <h1 style={{ fontSize: "1.5rem", paddingBlock: "10px" }}>
                Add Category
              </h1>
              <form>
                <input
                  type="text"
                  placeholder="Category's Name"
                  name="name"
                  value={form.name}
                  onChange={onChangeForm}
                  required
                />
                <button onClick={addCategories} type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddCategory;
