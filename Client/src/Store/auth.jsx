import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [client, setClient] = useState("");
    const [services, setServices] = useState("");

    // function to check the user Authentication or not

    const userAuthentication = async () => {
        
        try {
            const response = await fetch("http://localhost:3000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            // console.log(response);

            if (response.ok){
                const data = await response.json();
                // console.log("user data " ,data.userData);
                setClient(data.userData)
            }
            else {
                console.error("Error fetching user data");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getServices = async () => {
        try {
        
            const response = await fetch("http://localhost:3000/api/data/service",{
                method : "GET",
            })

            if (response.ok){
                const data = await response.json()
                // console.log(data.data);
                setServices(data.data)
            }
        } catch (error) {
            console.log(`FrontEnd server Error : ${error}`);
        }
    }

    useEffect(()=>{
        userAuthentication()
        getServices()
    },[])


    let isLoggedIn = !!token
    // console.log( "isLoggedIn", isLoggedIn );

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem( "token", serverToken )
    }

    //Tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
      };

    return (
        <AuthContext.Provider value={{storeTokenInLS, LogoutUser, isLoggedIn, client, services }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext)
};