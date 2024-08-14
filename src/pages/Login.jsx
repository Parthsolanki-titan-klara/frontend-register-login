import { Header } from "../componant/Header";
import Login from "../componant/Login";

export function LoginPage(){
    return(
        <>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
        </>
    );
}