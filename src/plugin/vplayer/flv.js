import flvjs from "flv.js";

function FlvPlayer({
  src,
  autoplay = false,
  media,
  options = {
    type: "flv",
    url: src,
  },
  callback = () => ({}),
}) {
  if (flvjs.isSupported()) {
    var player = flvjs.createPlayer(options);
    player.attachMediaElement(media);
    player.load();
    player.on(flvjs.Events.ERROR, (event) => {
      switch (event) {
        case flvjs.ErrorTypes.NETWORK_ERROR:
          player.load();
          break;
        default:
          player.destroy();
          break;
      }
    });
    if (autoplay) {
      player.play();
    }
    callback(player);
  }
}

export default FlvPlayer;
