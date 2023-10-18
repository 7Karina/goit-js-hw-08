import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function (data) {
  player.getCurrentTime().then(function (seconds) {
    console.log(seconds);
    localStorage.setItem('videoplayer-current-time', seconds);
  }, 1000);
};

player.on('videoplayer-current-time', onPlay);

player
  .setCurrentTime(30.456)
  .then(function (seconds) {
    seconds = 0;
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
