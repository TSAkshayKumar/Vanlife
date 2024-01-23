import React from "react";
import { loginUser } from "../api";
import {
  redirect,
  useLoaderData,
  useActionData,
  Form,
  useNavigation
} from "react-router-dom";

export async function loader({ request }) {
  return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
  try {
    await loginUser({ email, password })
    localStorage.setItem("userAuthorized", true);
    const response = redirect(pathname)
    response.body = true
    return response // return must me used as throw will direct it to catch block
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  const loginStatus = useNavigation()
  const message = useLoaderData();
  let errorMsg = useActionData();
  if (loginStatus.state === "submitting")
    errorMsg = ""

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMsg && <h3 className="red">{errorMsg}</h3>}
      <Form method="post" className="login-form" replace>
        <input
          name='email'
          type="email"
          placeholder="Email Address Eg: b@b.com"
        />
        <input
          name='password'
          type="password"
          placeholder="Password Eg: p123"
        />
        <button
          disabled={loginStatus.state === "submitting"}
        >
          {loginStatus.state === "submitting"
            ? "Logging in..."
            : "Log in"
          }
        </button>
      </Form>
    </div>
  )
}





// // With local form
// import React from "react";
// import { loginUser } from "../api";
// import { useNavigate, useLoaderData} from "react-router-dom";

// export async function loader({ request }) {
//   return new URL(request.url).searchParams.get("message")
// }

// export default function Login() {
//   const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
//   const [loginStatus, setLoginStatus] = React.useState("idle")
//   const [errorMsg, setErrorMsg] = React.useState(null)
//   const navigate = useNavigate();
//   const message = useLoaderData();

//   async function handleSubmit(e) {
//     e.preventDefault()
//     setLoginStatus("submitting")
//     setErrorMsg(null)
//     try {
//       await loginUser(loginFormData)
//       localStorage.setItem("userAuthorized", true);
//       navigate("/host", { replace: true })
//     } catch (err) {
//       setErrorMsg(err.message);
//     } finally {
//       setLoginStatus("idle")
//     }
//   }

//   function handleChange(e) {
//     const { name, value } = e.target
//     setLoginFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   return (
//     <div className="login-container">
//       <h1>Sign in to your account</h1>
//       {message && <h3 className="red">{message}</h3>}
//       {errorMsg && <h3 className="red">{errorMsg}</h3>}
//       <form onSubmit={handleSubmit} className="login-form">
//         <input
//           name='email'
//           onChange={handleChange}
//           type="email"
//           placeholder="Email Address"
//           value={loginFormData.email}
//         />

//         <input
//           name='password'
//           onChange={handleChange}
//           type="password"
//           placeholder="Password"
//           value={loginFormData.password}
//         />
//         <button
//           disabled={loginStatus === "submitting"}
//         >
//           {loginStatus === "submitting"
//             ? "Logging in..."
//             : "Log in"
//           }
//         </button>
//       </form>
//     </div>
//   )
// }