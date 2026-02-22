import {
  endAt,
  get,
  limitToFirst,
  orderByChild,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";
import { nextServer } from "./api";
import { auth, db } from "../firebase";
import { Teacher } from "@/types/teacher";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export async function getTeachers(
  limitCount = 4,
  lastValue?: number | string,
  priceFilter?: string | null,
) {
  let teachersQuery;

  if (priceFilter) {
    const price = Number(priceFilter);

    teachersQuery = lastValue
      ? query(
          ref(db, "teachers"),
          orderByChild("price_per_hour"),
          endAt(price),
          startAfter(lastValue),
          limitToFirst(limitCount),
        )
      : query(
          ref(db, "teachers"),
          orderByChild("price_per_hour"),
          endAt(price),
          limitToFirst(limitCount),
        );
  } else {
    teachersQuery = lastValue
      ? query(
          ref(db, "teachers"),
          orderByKey(),
          startAfter(lastValue),
          limitToFirst(limitCount),
        )
      : query(ref(db, "teachers"), orderByKey(), limitToFirst(limitCount));
  }

  const snapshot = await get(teachersQuery);
  if (!snapshot.exists()) return [];

  const data = snapshot.val() ?? {};

  return Object.entries(data).map(([id, teacher]) => ({
    id,
    ...(teacher as Teacher),
  }));
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(userCredential.user, { displayName: name });

  return userCredential.user;
}

export async function loginUser(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
}

export async function logout() {
  await signOut(auth);
}
