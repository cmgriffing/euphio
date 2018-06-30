import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class AlbumService {

  getAllByTags(tags) {
    return ipcRenderer.sendSync('getAllByTags', tags);
  }

}