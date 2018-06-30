import { Injectable } from '@angular/core';
import * as randomColor from 'randomcolor';

@Injectable()
export class ColorService {

  private tagColorCache = {};

  getTagColor(tag) {
    if(!this.tagColorCache[tag]) {
      this.tagColorCache[tag] = randomColor({
        luminosity: 'bright'
      });
    }
    return this.tagColorCache[tag];
  }

}