import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const signupUser = async (userData) => {
        try {
            const res = await fetch(`http://localhost:5000/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...userData }),
            });

            const result = await res.json();
            if (!result.error) {
                console.log(result);
            }
            if (result.message === "user exist") {
                setError(true)
                alert("user exist");
                navigate('/signup')
            }
        } catch (err) {
            console.log(err);
        }
    };
    signupUser()
    return (
        <div className="loginpage">
            <p>Member Login</p>
            <form className="form" onSubmit={handleSubmit}>
                <input type='text' placeholder='Username'></input> <br></br>
                <input type='password' placeholder='password'></input> <br></br>
                <input type='password' placeholder='Conformpassword'></input> <br></br>
                <button>REGISTER</button>
            </form>
        </div>
    )
}

export default Signup