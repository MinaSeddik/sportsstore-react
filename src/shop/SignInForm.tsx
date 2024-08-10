import React, {FormEvent, useState} from 'react';

type SignInErrorType = {
    email?: string;
    password?: string;
}
const INITIAL_ERROR_STATE: SignInErrorType = {};
const isValidEmail: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

function SignInForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(INITIAL_ERROR_STATE)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || email.length <= 1 || !email.match(isValidEmail)) {
            // setError(prev => {...prev, email: 'Invalid Email Address'})
            setError((prev) => ({...prev, email: 'Invalid Email Address'}));
            return;
        }
        setError(prev => INITIAL_ERROR_STATE)

        if (!password || password.length < 8) {
            // setError({...error, password: 'Password must be at least 8 chars'})
            setError((prev) => ({...prev, password: 'Password must be at least 8 chars'}));
            return;
        }
        setError(prev => INITIAL_ERROR_STATE)

        setIsSubmitting(true);
        // simulate API call
        await new Promise((resolve)=> setTimeout(resolve, 5000));

        setIsSubmitting(false);

        console.log('Form submitted!')
    }

    return (
        <div className="row my-3">
            <div className="col-4 offset-4 border border-1  rounded-1 p-2">
                <form noValidate onSubmit={handleSubmit} >
                    <label className="form-label">Email: </label>
                    <input type="email" className="form-control"
                           value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                    {error.email && <div className="text-danger">{error.email}</div>}
                    <br/>
                    <label className="form-label">Password: </label>
                    <input type="password" className="form-control"
                           value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                    {error.password && <div className="text-danger">{error.password}</div>}
                    <br/>
                    <button type="submit" disabled={isSubmitting}
                            className="btn btn-dark m-auto text-center d-block w-25">
                        Sign In
                        {isSubmitting &&
                            <div className="spinner-grow spinner-grow-sm float-end" role="status">
                        </div>
                        }
                    </button>
                </form>
            </div>
        </div>


    );
}

export default SignInForm;