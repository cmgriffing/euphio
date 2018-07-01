import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import * as parserFactory from 'bandcamp-tag-scraper';

// import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class ParserService {

  parser;

  constructor() {

    // const dbs = [
    //   'albums',
    //   'playlists',
    //   'timestamps',
    // ];

    // try {
    //   dbs.map(db => {
    //     readFileSync(`./${db}.dat`);
    //   });
    // } catch(e) {
    //   dbs.map(db => {
    //     writeFileSync(`./${db}.dat`, '');
    //   });
    // }

    const userPath = ipcRenderer.sendSync('getUserDataPath');
    console.log('userPath', userPath);
    const BandcampParser = parserFactory(userPath);
    this.parser = new BandcampParser();
    console.log('this.parser', this.parser);
  }

}