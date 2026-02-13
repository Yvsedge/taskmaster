import { useState } from "react"
import { motion } from 'framer-motion'
import { useAuthStore } from "../store/useAuthStore";

export default function LoginScreen(){

    const [flag, setFlag] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const { signIn, signUp } = useAuthStore(); 
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAuth = async () => {
        setError(null);
        setLoading(true);
        
        try {
            if (flag) {
                // LOGIN MODE
                await signIn(email, password);
                console.log("Login call finished!");
            } else {
                // SIGNUP MODE
                await signUp(email, password);
                alert("Signup successful! You can now log in.");
                setFlag(true); // Switch UI to login mode
            }
        } catch (err: any) {
    alert(err.message);
    setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if(error) return <div className="text-red-600">{error}</div>
    if(loading) return <div className="text-yellow-600">{loading}</div>
    return(
        <div className="flex justify-center items-center bg-black h-screen">
            <div className="m-5 bg-white text-black min-h-9/12 h-10/12 min-w-9/12">
                <motion.div 
                    className={flag ? "flex flex-row gap-1 h-full" : "flex flex-row-reverse gap-1 h-full"}
                    >
                    <motion.div 
                        className="flex-2 flex flex-col gap-5 justify-center items-center h-full bg-red-500 text-center"
                        layout
                        transition={{type : "spring" , stiffness: 200, damping: 25}}
                    >
                        <div
                            className="flex-2 flex flex-col gap-5 justify-center items-center h-full bg-red-500 text-center"
                        >
                            <motion.h1 className="text-2xl text-white" layout>{!flag ? "Welcome Back" : "New Here? Sign Up"}</motion.h1>
                            <motion.button
                                className="p-2 bg-white rounded-4xl pl-6 pr-6 shadow-lg active:scale-95"
                                layout
                                onClick={() => setFlag(!flag)}
                            >{!flag ? "Log in" : "Sign Up"}</motion.button>
                        </div>
                    </motion.div>
                    <motion.div 
                        className="flex-2 flex flex-col gap-5 justify-center items-center h-full text-center bg-white"
                        layout
                        transition={{type : "spring" , stiffness: 200, damping: 25}}
                    >
                        <motion.h3 className="text-red-600 font-semibold text-xl" layout>{flag ? "Log in" : "Sign Up"}</motion.h3>
                        <motion.div
                            className="text-left flex flex-col gap-2"
                            layout
                        >
                            <input 
                                type="email" 
                                name="mail" 
                                id="mail"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-2 pr-30 shadow-md bg-white text-black text-left rounded-xl  border border-zinc-500"
                             />
                        </motion.div>
                        <motion.div
                            className="text-left flex flex-col gap-2"
                            layout
                        >
                            <input 
                                type="password" 
                                name="pass" 
                                id="pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="p-2 pr-30 shadow-md bg-white text-black text-left rounded-xl border border-zinc-500"
                             />
                        </motion.div>
                        <motion.button
                            className="p-2 bg-red-600 text-white rounded-4xl pl-6 pr-6 shadow-lg active:scale-95 disabled:bg-red-200 disabled:active:scale-100"
                            layout
                            onClick={() => handleAuth()}
                            disabled={!email || !password}
                        >{flag ? "Log in" : "Sign Up"}</motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
