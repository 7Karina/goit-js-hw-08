import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const currentTimeKey = 'videoplayer-current-time';

const savedCurrentTime = localStorage.getItem(currentTimeKey);

if (savedCurrentTime !== null) {
  player.setCurrentTime(parseFloat(savedCurrentTime));
}

const onTimeUpdate = function (data) {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem(currentTimeKey, seconds);
  });
};

player.on('timeupdate', throttle(onTimeUpdate, 1000));
