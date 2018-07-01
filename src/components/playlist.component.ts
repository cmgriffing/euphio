import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { shell } from 'electron';

import { PlaylistService } from './../services/playlist.service';
import { ColorService } from './../services/color.service';

@Component({
  selector: 'euphio-playlist',
  templateUrl: './components/playlist.component.html',
  styleUrls: [
    './components/playlist.component.css',
    './styles/global.css',
    './styles/helpers.css',
  ],
})
export class PlaylistComponent implements OnChanges {

  @Input()
  title = 'Playlist';

  @Input()
  tags: string[] = [];

  @Input()
  albums: any[] = [];

  @Output()
  removed = new EventEmitter();

  filteredAlbums: any[] = [];
  showingAlbums = false;

  private hidingAlbumsMap = new Map();

  constructor(
    private playlistService: PlaylistService,
    public colorService: ColorService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.generateFilteredAlbums();
  }

  generateFilteredAlbums() {
    this.filteredAlbums = this.albums.filter(album => {
      const key = `clicked-${album.url}`;
      return localStorage.getItem(key) !== 'true';
    });
  }

  albumClick(url, event) {
    event.preventDefault();
    const key = `clicked-${url}`;
    localStorage.setItem(`clicked-${url}`, 'true');
    this.hidingAlbumsMap.set(key, true);
    this.generateFilteredAlbums();
    shell.openExternal(url);
    return false;
  }

  removePlaylist(name: string) {
    this.playlistService.remove(name);
    this.removed.emit(name);
  }

}
