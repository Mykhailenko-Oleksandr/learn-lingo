import { nextServer } from "./api";

// export async function sample(id: string) {
//   const res = await nextServer.get<{a: string}>(`/sample/${id}`);
//   return res.data;
// }

// import { getDatabase, ref, child, get } from "firebase/database";

// const dbRef = ref(getDatabase());
// get(child(dbRef, `teachers/1`))
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });
