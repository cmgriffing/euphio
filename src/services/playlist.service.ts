import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class PlaylistService {

  addPlaylist(playlist: {
    name: string,
    tags: string[],
  }) {
    ipcRenderer.sendSync('create', playlist.name);
    ipcRenderer.sendSync('addTagsToPlaylist', playlist.tags, playlist.name);
  }

  getAll() {
    return ipcRenderer.sendSync('getAll');
  }

  remove(name: string) {
    return ipcRenderer.sendSync('remove', name);
  }

}