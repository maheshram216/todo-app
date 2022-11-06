import { useState } from "react";
import { useNavigate} from "react-router-dom"

const Login = ()=>{
    const [user, setUser] = useState(null)
    const [credentials, setCredentials] = useState({
        username : "",
        password: ""
    })
    const userLogin =async()=>{
       try {
        const res = await fetch(`http://localhost:5000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user }),
      });
      const result = await res.json();
      if (!result.error) {
        console.log(result);
        localStorage.setItem("token", result.token);
        setUser(result.userData);
      } 
       } catch (error) {
        console.log(error);
       }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
          
        if (!credentials.username || !credentials.password) {
          alert(("Please enter all the required fields!"));
          return
          ;
    
        }
        // console.log(localStorage)
        userLogin(credentials);
      };
    
    return (
        <div className="loginpage">
            <p>Member Login</p>
            <form className="form" onSubmit={handleSubmit}>
                <input type='text' placeholder='Username'></input> <br></br>
                <input type='password' placeholder='password'></input> <br></br>
                <button>LOGIN</button>
            </form>
        </div>
    )
}

export default Login;