import { get, ref } from "firebase/database";
import { nextServer } from "./api";
import { db } from "../firebase";
import { Teacher } from "@/types/teacher";

export async function getAllData(): Promise<Teacher[]> {
  const snapshot = await get(ref(db));
  return snapshot.exists() ? snapshot.val() : [];
}
