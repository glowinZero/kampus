function LoginPage(){
    const user = localStorage.getItem("type_user")
    return(
        <div>
            <h1>Hi {user}</h1>

        </div>
    )
}

export default LoginPage