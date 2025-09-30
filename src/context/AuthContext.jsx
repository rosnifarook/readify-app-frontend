import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { useAuthContext as useAsgardeo } from "@asgardeo/auth-react";

const AuthContext = createContext();

// Hook for consuming context
//eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------- Asgardeo ----------------
  const {
    state: asgState,
    signIn: asgSignIn,
    signOut: asgSignOut,
    getBasicUserInfo,
    getDecodedIDToken,
  } = useAsgardeo();

  const signInWithAsgardeo = async () => {
    await asgSignIn();
  };

  const logoutAsgardeo = async () => {
    await asgSignOut();
  };

  // Sync Asgardeo user → currentUser
  useEffect(() => {
    let cancelled = false;

    const syncAsgUser = async () => {
      if (asgState?.isAuthenticated) {
        try {
          const basic = await getBasicUserInfo();
          const decoded = await getDecodedIDToken();
          const email =
            basic?.email || decoded?.email || decoded?.username || null;

          if (!cancelled) {
            setCurrentUser({
              email,
              displayName: basic?.name || decoded?.given_name || email,
              photoURL: basic?.picture || null,
              provider: "asgardeo",
            });
            setLoading(false);
          }
        } catch {
          if (!cancelled) setLoading(false);
        }
      }
    };

    syncAsgUser();
    return () => {
      cancelled = true;
    };
  }, [asgState?.isAuthenticated]);
  // ------------------------------------------

  // ---------------- Firebase ----------------
  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          provider: "firebase",
        });
      } else {
        // Only clear if Asgardeo is also not authenticated
        if (!asgState?.isAuthenticated) {
          setCurrentUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [asgState?.isAuthenticated]);
  // ------------------------------------------

  const value = {
    currentUser,
    loading,

    // Firebase
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,

    // Asgardeo
    signInWithAsgardeo,
    logoutAsgardeo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../firebase/firebase.config";
// import { useAuthContext as useAsgardeo } from "@asgardeo/auth-react";

// const AuthContext = createContext();

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// const googleProvider = new GoogleAuthProvider();

// //auth provider
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   //register user
//   const registerUser = async (email, password) => {
//     return await createUserWithEmailAndPassword(auth, email, password);
//   };

//   //login user
//   const loginUser = async (email, password) => {
//     return await signInWithEmailAndPassword(auth, email, password);
//   };

//   //sign in/up with google
//   const signInWithGoogle = async () => {
//     return await signInWithPopup(auth, googleProvider);
//   };

//   //logout the user
//   const logout = () => {
//     return signOut(auth);
//   };

//   //manage user
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);

//       if (user) {
//         const { email, displayName, photoURL } = user;
//         const userData = {
//           email,
//           username: displayName,
//           photo: photoURL,
//         };
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const value = {
//     currentUser,
//     loading,
//     registerUser,
//     loginUser,
//     signInWithGoogle,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
