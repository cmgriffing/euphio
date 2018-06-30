import { NgModule, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';

import { PlaylistService } from './services/playlist.service';
import { AlbumService } from './services/album.service';
import { ColorService } from './services/color.service';

import {
  // Component Modules
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatChipsModule,
  MatFormFieldModule,
  MatMenuModule,
  MatSnackBarModule,

  // Components
  MatSidenav,
  MatSnackBar,

  // Other
  MAT_CHIPS_DEFAULT_OPTIONS,
  MatChipInputEvent,
  MatSnackBarConfig,
} from '@angular/material';

import { PlaylistComponent } from './components/playlist.component';

@Component({
  selector: 'App',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    './styles/global.css',
    './styles/helpers.css',
    './theme.css',
  ],
})
export class AppComponent implements OnInit {

  playlists: any[] = [];

  // add playlist form stuff
  newPlaylistTitleCtrl = new FormControl();
  newPlaylistTagCtrl = new FormControl();
  newPlaylistTags: string[] = [];

  @ViewChild('addPlaylistMenu')
  playlistMenu: MatSidenav;

  commonSnackBarConfig = new MatSnackBarConfig();

  albumInterval;

  constructor(
    private albumService: AlbumService,
    private playlistService: PlaylistService,
    private snackBar: MatSnackBar,
  ) {
    this.commonSnackBarConfig.duration = 5000;
    this.commonSnackBarConfig.verticalPosition = 'top';
  }

  ngOnInit(): void {
    this.playlists = this.playlistService.getAll();

    this.fetchAlbumsForPlaylists();
    setInterval(() => {
      this.fetchAlbumsForPlaylists();
    }, 10000);
  }

  ngOnDestroy() {
    if(this.albumInterval) {
      clearInterval(this.albumInterval);
    }
  }

  fetchAlbumsForPlaylists() {
    this.playlists = this.playlists.map(playlist => {
      playlist.albums = this.albumService.getAllByTags(playlist.tags);
      return playlist;
    });
  }

  addPlaylist() {
    const playlist = {
      name: this.newPlaylistTitleCtrl.value,
      tags: this.newPlaylistTags,
    };

    if(!playlist.name) {
      this.snackBar.open(
        'Playlist name/title cannot be empty.',
        'Error',
        this.commonSnackBarConfig,
      );
      return;
    }


    if(!playlist.tags.length) {
      this.snackBar.open(
        'The tags must not be empty.',
        'Error',
        this.commonSnackBarConfig,
      );
      return;
    }

    let index = -1;
    this.playlists.map((_playlist, _index) => {
      if(_playlist.name === playlist.name) {
        index = _index;
      }
    });

    if(index >= 0) {
      this.snackBar.open(
        'You cannot use a name that already exists.',
        'Error',
        this.commonSnackBarConfig,
      );
      return;
    }

    this.playlistService.addPlaylist(playlist);

    this.playlists.push(playlist);
    this.playlistMenu.toggle();
    this.clearAddPlaylistForm();
  }

  clearAddPlaylistForm() {
    this.newPlaylistTitleCtrl.setValue(null);
    this.newPlaylistTags = [];
  }

  addTagToNewPlaylist(event: MatChipInputEvent) {
    this.newPlaylistTags.push(event.value);
    this.newPlaylistTagCtrl.setValue(null);
  }

  removeTagFromNewPlaylist(tag: string) {
    tag = tag.split(' ')[1];
    const index = this.newPlaylistTags.indexOf(tag);

    if (index >= 0) {
      this.newPlaylistTags.splice(index, 1);
    }
  }

  playlistRemoved(playlistName) {
    let index = -1;

    this.playlists.map((playlist, i) => {
      if(playlist.name === playlistName) {
        index = i;
      }
    })

    if(index >= 0) {
      this.playlists.splice(index, 1);
    }
  }

}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    FlexLayoutModule,
  ],
  declarations: [
    AppComponent,
    PlaylistComponent,
  ],
  bootstrap: [
    AppComponent,
    //PlaylistComponent,
  ],
  providers: [
    AlbumService,
    PlaylistService,
    ColorService,
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA, SPACE]
      }
    }
  ]
})
export class AppModule { }
