import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/layout/Spinner";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await axios.post("https://expense-tracker-server-mr2f.onrender.com/api/v1/users/register", values).then((res) => {
        if (res.data.emailExists) {
          message.error("user already exists, please change your email.");
          setLoading(false);
          return;
        }
        if (res.data.userExists) {
          message.error("user already exists.");
          setLoading(false);
          return;
        } else {
          message.success("register successfully");
          setLoading(false);
          navigate("/login");
        }
      });
    } catch (error) {
      message.error(`something went wrong \n`);
    }
  };

  // prevent user to go back to register page after register
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Layout>
        <div className=" register-page mt-4 ">
          {loading && <Spinner />}
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            className="bg-secondary p-5 rounded"
          >
            {" "}
            {/* antd doesn't have onSubmit */}
            <h1 className="txt">Please Register</h1>
            <p className="text-warning txt">
              Mobile ma nakholnu ni, malai CSS lekhna alxi lagyo.
            </p>
            <Form.Item label="Username" name="name">
              <Input type="text" placeholder="Enter Username" required />
            </Form.Item>
            <Form.Item label="email" name="email">
              <Input type="email" placeholder="Enter Email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Enter Password" required />
            </Form.Item>
            <div className=" abc d-flex justify-content-between">
              <Link to="/login" className="text-warning">
                Already Registered? Click here to Login.
              </Link>
              <br />
              <button className="btn btn-primary">Register</button>
            </div>
          </Form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
