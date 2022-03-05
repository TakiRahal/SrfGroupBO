import React from 'react';
import './SignIn.scss';
import {IRootState} from "../../shared/reducers";
import {connect} from "react-redux";
import {loginAdmin} from "../../shared/reducers/user-reducer";
import {initialValuesSignIn, validationSchemaSignIn} from "./validation/validation-signin";
import {useFormik} from "formik";
import {ALL_APP_ROUTES} from "../../core/config/all-app-routes";
import {useHistory} from "react-router";

const initialValues = initialValuesSignIn;

interface ISignIn {
    email: string;
}

export interface ISignInProps extends StateProps, DispatchProps {}

export const SignIn = (props: ISignInProps) => {

    const history = useHistory();

    const {loginAdmin, isAuthenticated, loading} = props;

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemaSignIn,
        onSubmit: values => {
            loginAdmin(values.email.toString(), values.password.toString(), true);
        },
    });

    React.useEffect(() => {
        if (isAuthenticated) {
            history.push(ALL_APP_ROUTES.DASHBOARD);
        }
    }, [isAuthenticated]);

    return (
        <div className="container-signin">
            <div className="flex justify-center">
                <div className="w-1/4">
                    <form onSubmit={formik.handleSubmit}>

                        <div className="mt-5 text-gray-700">
                            <label className="block mb-1" htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Email..."
                                className={formik.touched.email && Boolean(formik.errors.email) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :
                                    'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                                aria-describedby="passwordHelp"
                                value={formik.values.email}
                                onChange={formik.handleChange}/>
                            <span className="text-xs text-red-700" id="passwordHelp">{formik.touched.email && formik.errors.email}</span>
                        </div>

                        <div className="mt-5 text-gray-700">
                            <label className="block mb-1" htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password..."
                                className={formik.touched.password && Boolean(formik.errors.password) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :
                                    'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                                aria-describedby="passwordHelp"
                                value={formik.values.password}
                                onChange={formik.handleChange}/>
                            <span className="text-xs text-red-700" id="passwordHelp">{formik.touched.password && formik.errors.password}</span>
                        </div>

                        <div className="mt-5">
                            <button className="px-6 py-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100 w-full"
                                    type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = ({user}: IRootState) => ({
    loading: user.loginLoading,
    isAuthenticated: user.isAuthenticated,
});

const mapDispatchToProps = {
    loginAdmin
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);