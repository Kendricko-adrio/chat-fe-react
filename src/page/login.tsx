import { useState } from "react";
import { CurrUser } from './../util/currUser';
import { Navigate, useNavigate } from "react-router-dom";
import { getUserByUsername } from "../services/UserService";
import { postUserLogin } from './../services/UserService';

interface Form{
    username?: string;
    password?: string;
}

const Login = () => {

    const [username, setUsername] = useState<Form>();
    const [currUser, setCurrUser] = useState<CurrUser>(CurrUser.getInstance());

    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        postUserLogin(username?.username as string, username?.password as string).then((res) => {
            const currUser = CurrUser.getInstance();
            currUser.setUser(res);
            navigate("/chat");
            console.log(res);
        });
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername({
            ...username,
            [e.target.name]: e.target.value
        });
    }


    return (
      <div className="flex flex-row justify-center items-center w-screen h-screen bg-secondary">
        <div className="w-[100%] h-auto flex flex-col items-center justify-evenly bg-primary p-[20px] max-w-[400px] min-w-[320px] min-h-[50%] rounded-3xl ">
          <h1>Login</h1>
          <form
            action="post"
            className="flex flex-col items-center w-full"
            onSubmit={onSubmit}
          >
            <div className="form-child">
              <input
                type="text"
                placeholder="🤵 username"
                name="username"
                className="form-input-text"
                value={username?.username}
                onChange={onChange}
              />
            </div>
            <div className="form-child">
              <input
                type="text"
                placeholder="🔒 password"
                name="password"
                className="form-input-text"
                value={username?.password}
                onChange={onChange}
              />
            </div>
            <input type="submit" value="Submit" className="btn" />
          </form>
          <div>
            <p>Don't have an account?</p>
          </div>
        </div>
      </div>
    );
}

export default Login;