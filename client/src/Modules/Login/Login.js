import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Form, Icon, Input, Button } from "antd";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./Login.css";
const FormItem = Form.Item;

@observer
class LoginPage extends Component {
  render() {
    const { props } = this;
    const { getFieldDecorator } = props.form;
    const {
      users: {
        handleLoginSubmit
      }
    } = props
    return (
      <Form onSubmit={(e) => handleLoginSubmit(e, props.form, props.history)} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={props.isLoading}
          disabled={props.isLoading}
        >
          Log in
      </Button>
        <Link to="/register" >
          <Button type="primary" disabled={props.isLoading} className="login-register-button">
            Register
      </Button>
        </Link>
      </Form>
    );
  }
}

const WrappedLoginPage = Form.create()(LoginPage);

export default inject("users")(withRouter(WrappedLoginPage));
