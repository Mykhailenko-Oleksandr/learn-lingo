import { get, ref } from "firebase/database";
import { nextServer } from "./api";
import { auth, db } from "../firebase";
import { Teacher } from "@/types/teacher";
import { v4 as uuid } from "uuid";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export async function getAllData(): Promise<Teacher[]> {
  const snapshot = await get(ref(db));

  if (!snapshot.exists()) return [];

  const data = snapshot.val();
  if (Array.isArray(data)) {
    return data.map((teacher) => ({
      id: uuid(),
      ...(teacher as Teacher),
    }));
  }

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
