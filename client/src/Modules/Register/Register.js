import React, { Component } from 'react'
import { Col, Row, Form, Icon, Input, Button } from 'antd'
import "./Register.css"
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'
const FormItem = Form.Item

@observer
class RegisterPage extends Component {
  render() {
    const { props } = this
    const { getFieldDecorator } = props.form;
    const {
      users: {
        handleRegisterSubmit
      }
    } = props
    return (
      <Form onSubmit={(e) => handleRegisterSubmit(e, props.form, props.history)} className="login-form">
        <Row gutter={10}>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator('fname', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your first name!'
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="First Name"
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator('lname', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your last name!'
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Last Name"
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please input your username!'
              },
              {
                type: 'email',
                message: "please enter proper email"
              }
            ]
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
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
            />
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        <Link to="/login" >
          <Button type="primary" className="login-register-button">
            Back to Login
        </Button>
        </Link>
      </Form>
    )
  }
}

const WrappedRegisterPage = Form.create()(RegisterPage);

export default inject("users")(withRouter(WrappedRegisterPage));
