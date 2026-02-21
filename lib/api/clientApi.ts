import {
  get,
  limitToFirst,
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

export async function getTeachers(limitCount = 4, lastKey?: string) {
  let teachersQuery;

  if (lastKey) {
    teachersQuery = query(
      ref(db, "teachers"),
      orderByKey(),
      startAfter(lastKey),
      limitToFirst(limitCount),
    );
  } else {
    teachersQuery = query(
      ref(db, "teachers"),
      orderByKey(),
      limitToFirst(limitCount),
    );
  }

  const snapshot = await get(teachersQuery);

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

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
