
const AuthForm = ({ submitUserData }) => {
    return (
        <div className='form-container'>

            <form id='user-log-in' onSubmit={submitUserData}>
                <label htmlFor='email'></label>
                <input
                    className='input-field'
                    type='email'
                    name='email'
                    placeholder='enter email'
                    required
                ></input>

                <label htmlFor='password'></label>
                <input
                    className='input-field'
                    type='text'
                    name='password'
                    placeholder="enter password"
                    required
                ></input>

                <input
                    className="button"
                    type="submit"
                    value="Submit"
                ></input>

            </form>

        </div>
    )
}

export default AuthForm