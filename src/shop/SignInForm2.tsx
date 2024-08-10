import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

type FormFields = {
    email: string;
    password: string;
}

function SignInForm2() {

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting},
    } = useForm<FormFields>();


    const onSubmit: SubmitHandler<FormFields> = async (formData: FormFields) => {

        // simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            throw new Error('Simulate backend error payload')
        }catch (err){
            // setError("email", {message: "Backend email message"})
            // setError("password", {message: "Backend password message"})
            setError("root", {message: "Backend General message"})
        }


        console.log(`Form submitted with data ${JSON.stringify(formData)}`)
    }

    return (
        <div className="row my-3">
            <div className="col-4 offset-4 border border-1  rounded-1 p-2">

                {errors.root &&
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Holy guacamole!</strong> {errors.root.message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                }

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-label">Email: </label>
                    <input type="email" className="form-control" {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                            message: "Invalid Email address"
                        },
                        validate: (value) => {
                            if (!value.includes("@")) {
                                return "Email must include @ char"
                            }
                            return true
                        }
                    })} />
                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                    <br/>
                    <label className="form-label">Password: </label>
                    <input type="password" className="form-control" {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 chars"
                        }
                    })} />
                    {errors.password && <div className="text-danger">{errors.password.message}</div>}
                    <br/>
                    <button type="submit" disabled={isSubmitting}
                            className="btn btn-primary m-auto text-center d-block w-25">
                        Sign In
                    </button>
                </form>
            </div>
        </div>


    );
}

export default SignInForm2;