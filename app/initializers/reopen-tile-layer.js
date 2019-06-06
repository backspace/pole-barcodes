// eslint-disable-next-line no-unused-vars
import CachedTileLayer from 'leaflet.tilelayer.pouchdbcached';
import { TileLayer } from 'ember-leaflet';

export function initialize() {
  TileLayer.reopen({
    leafletOptions: Object.freeze([
      'minZoom',
      'maxZoom',
      'maxNativeZoom',
      'tileSize',
      'subdomains',
      'errorTileUrl',
      'attribution',
      'tms',
      'continuousWorld',
      'noWrap',
      'zoomOffset',
      'zoomReverse',
      'opacity',
      'zIndex',
      'unloadInvisibleTiles',
      'updateWhenIdle',
      'detectRetina',
      'reuseTiles',
      'bounds',
      'className',
      'useCache',
      'crossOrigin',
      'useOnlyCache',
    ]),
  });
}

export default {
  initialize,
};
