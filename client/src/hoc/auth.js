import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";

export default function Protected(Children) {
    @inject("users")
    @observer
    class AuthenticatedComponent extends Component {
        constructor(props) {
            super(props);
            const {
                users,
                history
            } = this.props;
            this.store = users;
            users.compHistory = history;
        }


        render() {
            if (localStorage.getItem("token")) {
                return (<Children {...this.props} />)
            }
            return (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: this.props.location }
                    }}
                />
            );
        }
    }
    AuthenticatedComponent.propTypes = Children.propTypes;
    return AuthenticatedComponent;
}
