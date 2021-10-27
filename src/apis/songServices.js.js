import { axiosClient } from "./apiClient";

export function getAllSongs(data) {
  return axiosClient.post("/user/api/songs", data);
}

export function getSongDetails(data) {
  return axiosClient.post("/user/api/songDetails", data);
}
export function addToLikedSongs(data) {
  return axiosClient.post("/user/api/addLiked", data);
}

export function unlikeSong(data) {
  return axiosClient.post("/user/api/removeLiked", data);
}

export function getLikedSongs() {
  return axiosClient.get("/user/api/likedSongs");
}

export function createPlaylist(data) {
  return axiosClient.post("/user/api/createPlay", data);
}
export function addToPlaylist(data) {
  return axiosClient.post("/user/api/addToPlaylist", data);
}

export function removeFromPlaylist(data) {
  return axiosClient.post("/user/api/removeFromPlaylist", data);
}
export function deletePlaylist(data) {
  return axiosClient.post("/user/api/deletePlaylist", data);
}
export function getAllPlaylist() {
  return axiosClient.get("/user/api/getPlaylists");
}

export function getPlaylistDetails(data) {
  return axiosClient.post("/user/api/playlistDetails", data);
}
