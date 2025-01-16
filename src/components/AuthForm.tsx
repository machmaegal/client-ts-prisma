import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AuthForm = ({ submitUserData }) => {
    const user = useContext(AuthContext)
    const userEmail = user?.user?.email || '';

    return (
        <div className='form-container'>

            <form id='auth-form' onSubmit={submitUserData}>
                <label htmlFor='email'></label>
                <input
                    className='input-field'
                    type='email'
                    name='email'
                    placeholder='enter email'
                    required
                    defaultValue={userEmail}
                >
                </input>

                <label htmlFor='password'></label>
                <input
                    className='input-field'
                    type='password'
                    name='password'
                    placeholder="enter password"
                    required
                >
                </input>

                <input
                    className="button"
                    type="submit"
                    value="Submit"
                >
                </input>

            </form>

        </div>
    )
}

export default AuthForm