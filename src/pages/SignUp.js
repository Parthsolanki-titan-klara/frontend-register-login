import { Header } from "../componant/Header";
import SignUp from "../componant/SignUp";

export default function SignupPage(){
    return(
        <>
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/signIn"
            />
            <SignUp/>
        </>
    )
}