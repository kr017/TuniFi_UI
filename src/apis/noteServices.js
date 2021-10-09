import { axiosClient } from "./apiClient";

export function getAllSongs(data) {
  return axiosClient.post("/user/api/songs", data);
}

export function addNote(data) {
  return axiosClient.post("/api/addNotes", data);
}

export function updateNote(data) {
  return axiosClient.put("/api/updateNote", data);
}

export function deleteNote(data) {
  return axiosClient.post("/api/deleteNote", data);
}
export function deletePermanentNote(data) {
  return axiosClient.post("/api/deletePermanentNote", data);
}
export function restoreNote(data) {
  return axiosClient.post("/api/restoreNote", data);
}
export function archieveNote(data) {
  return axiosClient.post("/api/archieveNote", data);
}
export function unArchieveNote(data) {
  return axiosClient.post("/api/unArchieveNote", data);
}
export function getTrashNotes() {
  return axiosClient.get("/api/trashNotes");
}
