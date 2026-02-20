import { get, ref } from "firebase/database";
import { nextServer } from "./api";
import { db } from "../firebase";
import { Teacher } from "@/types/teacher";
import { v4 as uuid } from "uuid";

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
