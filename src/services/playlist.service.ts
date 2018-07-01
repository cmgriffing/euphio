import { Injectable } from '@angular/core';

import { ParserService } from './parser.service';

@Injectable()
export class PlaylistService {

  constructor(
    private parserService: ParserService
  ) {}

  async addPlaylist(playlist: {
    name: string,
    tags: string[],
  }) {
    await this.parserService.parser.playlists.create(playlist.name);
    return this.parserService.parser.playlists.addTagsToPlaylist(playlist.tags, playlist.name);
  }

  getAll() {
    return this.parserService.parser.playlists.getAll();
  }

  remove(name: string) {
    return this.parserService.parser.playlists.remove(name);
  }

}