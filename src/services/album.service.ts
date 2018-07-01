import { Injectable } from '@angular/core';

import { ParserService } from './parser.service';

@Injectable()
export class AlbumService {

  constructor(
    private parserService: ParserService
  ) {}

  getAllByTags(tags) {
    return this.parserService.parser.albums.getAllByTags(tags);
  }

}