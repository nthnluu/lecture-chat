import Button from "../components/forms/Button";
import TextInput from "../components/forms/TextInput";
import Divider from "../components/Misc/Divider";
import fb from "../util/firebase-config";
import {useRouter} from "next/router";
import {useState} from "react";

const Login = () => {
    const router = useRouter()
    const [error, setError] = useState(false)

    function signIn(provider) {
        let currentProvider;
        switch (provider) {
            case ("google"):
                currentProvider = new fb.auth.GoogleAuthProvider()
                break
            case ("github"):
                currentProvider = new fb.auth.GithubAuthProvider()
        }
        fb.auth().signInWithPopup(currentProvider)
            .then(() => window.location.href = '/')
            .catch(() => setError(true))
    }

    return <div className="h-screen">
        <div className="text-center h-full relative flex justify-center items-center px-12">
            <div>
                <img src="/logo.svg" className="h-24 mx-auto mb-8"/>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Welcome to Lecture Chat</h1>
                <h2 className="text-lg md:text-xl text-gray-400 font-light mb-8 max-w-md mx-auto">
                    A simple, effective way for students and teachers to communicate.
                </h2>
                {error && <p className="text-red-500 font-medium text-center mb-4">There was a problem signing you in.</p>}

                <div className="space-y-4">
                    <button
                        onClick={() => signIn("google")}
                        className="bg-gray-100 text-gray-700 p-3 rounded-lg w-full font-medium inline-flex items-center justify-center">
                        <img src="/g_logo.svg" className="h-5 mr-2" alt=""/>
                        Continue with Google
                    </button>

                    <button
                        onClick={() => signIn("github")}
                        className="bg-gray-900 text-white p-3 rounded-lg w-full font-medium inline-flex items-center justify-center">
                        <i className="fab fa-github mr-2 text-xl"/>
                        Continue with GitHub
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default Login