import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/session';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

function LoginFormPage(props) {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	
	if(currentUser){
		return <Redirect to="/" />
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		// dispatch(loginUser(user));
		return dispatch(loginUser({credential, password}))
			// Questions: what does dispatch return? how does try/catch work?
			.catch(async (res) => {
				if(res.errors) {
					setErrors(res.errors);
				}
			})

		


		// setCredential("")
		// setPassword("")
	}


	return(
		<>
			<form onSubmit={handleSubmit}>
				<label>Username
					<input type="text" placeholder='Username' value={credential} onChange={(e) => setCredential(e.target.value)} ></input>
				</label>
				<label>Password
					<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
				</label>
				<button type="submit">Login</button>
			</form>
		</>
	)
}

export default LoginFormPage;