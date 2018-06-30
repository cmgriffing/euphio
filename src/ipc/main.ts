//import BandcampParser from 'bandcamp-tag-scraper';
const BandcampParser = require('bandcamp-tag-scraper');
const { ipcMain } = require('electron')

const wireUpEvent = function(eventName, service) {
  ipcMain.on(eventName, (event, ...args) => {
    service[eventName](...args).then(result => {
      event.returnValue = result;
    });
  });
}

export default function() {
  const parser = new BandcampParser();

  [
    'getAllByTags',
    'getByUrl',
  ].map(event => {
    wireUpEvent(event, parser.albums);
  });

  [
    'create',
    'remove',
    'getAll',
    'getByName',
    'addTagsToPlaylist',
    'removeTagFromPlayList',
  ].map(event => {
    wireUpEvent(event, parser.playlists);
  });

}