import { get, ref, remove, set } from "firebase/database";
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
  lastKey?: string,
  priceFilter?: string | null,
  languageFilter?: string | null,
  levelFilter?: string | null,
): Promise<Teacher[]> {
  const snapshot = await get(ref(db, "teachers"));
  if (!snapshot.exists()) return [];

  let teachers = Object.entries(snapshot.val()).map(([id, teacher]) => ({
    id,
    ...(teacher as Teacher),
  }));

  if (priceFilter) {
    teachers = teachers.filter((t) => t.price_per_hour == Number(priceFilter));
  }

  if (languageFilter) {
    teachers = teachers.filter((t) => t.languages.includes(languageFilter));
  }

  if (levelFilter) {
    teachers = teachers.filter((t) => t.levels.includes(levelFilter));
  }

  if (lastKey) {
    const lastIndex = teachers.findIndex((t) => t.id === lastKey);
    teachers = teachers.slice(lastIndex + 1, lastIndex + 1 + limitCount);
  } else {
    teachers = teachers.slice(0, limitCount);
  }

  return teachers;
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

export async function addFavorite(userId: string, teacherId: string) {
  await set(ref(db, `users/${userId}/favorites/${teacherId}`), true);
}

export async function removeFavorite(userId: string, teacherId: string) {
  await remove(ref(db, `users/${userId}/favorites/${teacherId}`));
}

export async function getUserFavorites(userId: string) {
  const snapshot = await get(ref(db, `users/${userId}/favorites`));

  if (!snapshot.exists()) return [];

  return Object.keys(snapshot.val());
}
