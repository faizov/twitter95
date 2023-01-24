import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Router, { useRouter } from "next/router";

import jwt_decode from "jwt-decode";

import { selectCurrentUser, setCredentials } from "../__data__/auth/authSliced";
import { useGetMeQuery } from "../__data__/userApi";
import next from "next/types";

export const useAuth = () => {
  const router = useRouter();
  const { token } = router.query;

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [userId, setUserId] = useState(0);

  const { data } = useGetMeQuery(Number(userId), { skip: !userId });

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");

    if (tokenLocal) {
      const decodedUser: any = jwt_decode(tokenLocal as string);
      setUserId(decodedUser.id);

      if (data) {
        const credentials = {
          token: tokenLocal,
          user: data.user,
        };

        dispatch(setCredentials(credentials));
      }
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (token) {
      const decodedUser: any = jwt_decode(token as string);
      setUserId(decodedUser.id);
      localStorage.setItem("token", token as string);

      if (data) {
        const credentials = {
          token: token,
          user: data.user,
        };
        dispatch(setCredentials(credentials));
        router.push("/");
      }
    }
  }, [token, data]);

  return useMemo(() => ({ user }), [user]);
};

// import { useMemo, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import jwt_decode from "jwt-decode";
// import Router from "next/router";

// import { selectCurrentUser, setCredentials } from "../__data__/auth/authSliced";

// export const useAuth = () => {
//   const [calledPush, setCalledPush] = useState(false);
//   const dispatch = useDispatch();
//   const user = useSelector(selectCurrentUser);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedUser = jwt_decode(token);

//         const credentials = {
//           token: token,
//           user: decodedUser,
//         };

//         dispatch(setCredentials(credentials));
//       } catch (error) {
//         console.log("error", error);
//       }
//     } else {
//       if (calledPush) {
//         return;
//       }
//       Router.push("/");
//       setCalledPush(true);
//     }
//   }, [dispatch]);

//   return useMemo(() => ({ user }), [user]);
// };
