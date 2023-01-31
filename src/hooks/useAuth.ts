import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import jwt_decode from "jwt-decode";

import { selectCurrentUser, setCredentials } from "../__data__/auth/authSliced";
import { useGetMeQuery } from "../__data__/userApi";

export const useAuth = () => {
  const router = useRouter();
  const { token } = router.query;

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [userId, setUserId] = useState(0);

  const { data } = useGetMeQuery(Number(userId), { skip: !userId });

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");

    const userLikes = localStorage.getItem("ids")
      ? JSON.parse(localStorage.getItem("ids") || "")
      : [];

    if (localUser && localToken) {
      const credentials = {
        token: localToken,
        user: JSON.parse(localUser),
        likes: userLikes,
      };

      dispatch(setCredentials(credentials));
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      const decodedUser: any = jwt_decode(token as string);
      setUserId(decodedUser.id);
      localStorage.setItem("token", token as string);

      if (data) {
        const credentials = {
          token: token,
          user: data.user,
          likes: data.user.likes,
        };
        dispatch(setCredentials(credentials));
        router.push("/");
      }
    }
  }, [token, data]);

  return useMemo(() => ({ user }), [user]);
};
