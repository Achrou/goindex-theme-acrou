<template>
  <div class="content g2-content">
    <div v-if="player && player.api" class="video-content">
      <iframe
        width="100%"
        height="100%"
        :src="apiUrl"
        frameborder="0"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        allowtransparency="true"
        allowfullscreen="true"
      ></iframe>
    </div>
    <div v-else>
      <vue-plyr ref="plyr" :options="{ autoplay: player.autoplay }">
        <video>
          <source :src="videoUrl" type="video/mp4" />
          <!-- <track
          kind="captions"
          label="English"
          srclang="en"
          src="captions-en.vtt"
          default
        /> -->
        </video>
      </vue-plyr>
    </div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <span class="icon">
            <i class="fa fa-play-circle" aria-hidden="true"></i>
          </span>
          {{ $t("page.video.play") }} /
          <span class="icon">
            <i class="fa fa-download" aria-hidden="true"></i>
          </span>
          {{ $t("page.video.download") }}
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <label class="label">{{ $t("page.video.link") }}</label>
            <div class="control">
              <input class="input" type="text" :value="videoUrl" />
            </div>
          </div>
          <div class="columns is-mobile is-multiline has-text-centered">
            <div
              class="column"
              v-for="(item, index) in players"
              v-bind:key="index"
            >
              <p class="heading">
                <a :href="item.scheme">
                  <figure class="image is-48x48" style="margin: 0 auto;">
                    <img class="icon" :src="item.icon" />
                  </figure>
                </a>
              </p>
              <p class>{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { decode64 } from "@utils/AcrouUtil";
import Hls from "hls.js";
import flvjs from "flv.js";
export default {
  data: function() {
    return {
      apiUrl: "",
      player: window.themeOptions.player,
      videoUrl: "",
    };
  },
  methods: {
    render() {
      let path = encodeURI(this.url);
      let index = path.lastIndexOf(".");
      this.suffix = path.substring(index + 1, path.length);
      this.videoUrl = window.location.origin + encodeURI(this.url);
      this.apiUrl = this.player.api + this.videoUrl;
      if (!this.player || !this.player.api) {
        let options = { src: this.videoUrl, media: this.plyr.media };
        if (this.suffix === "m3u8") {
          this.hls(options);
        } else if (this.suffix === "flv") {
          this.flv(options);
        }
      }
    },
    hls({ src, media }) {
      // eslint-disable-next-line no-undef
      if (Hls.isSupported()) {
        // For more Hls.js options, see https://github.com/dailymotion/hls.js
        // eslint-disable-next-line no-undef
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(media);
        hls.on(Hls.Events.ERROR, function(event, data) {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              default:
                hls.destroy();
                break;
            }
          }
        });
        if (this.player.autoplay) {
          hls.on(Hls.Events.MANIFEST_PARSED, function() {
            media.play();
          });
        }
        window.hls = hls;
        // Handle changing captions
        this.plyr.on("languagechange", () => {
          // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
          setTimeout(() => (hls.subtitleTrack = this.plyr.currentTrack), 50);
        });
      }
    },
    flv({ src, media }) {
      if (flvjs.isSupported()) {
        var flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: src,
        });
        flvPlayer.attachMediaElement(media);
        flvPlayer.load();
        flvPlayer.on(flvjs.Events.ERROR, (event) => {
          switch (event) {
            case flvjs.ErrorTypes.NETWORK_ERROR:
              flvPlayer.load();
              break;
            default:
              flvPlayer.destroy();
              break;
          }
        });
        if (this.player.autoplay) {
          flvPlayer.play();
        }
      }
    },
  },
  activated() {
    this.render();
  },
  computed: {
    plyr() {
      return this.$refs.plyr.player;
    },
    url() {
      if (this.$route.params.path) {
        return decode64(this.$route.params.path);
      }
      return "";
    },
    players() {
      return [
        {
          name: "IINA",
          icon: this.$cdnpath("images/player/iina.png"),
          scheme: "iina://weblink?url=" + this.videoUrl,
        },
        {
          name: "PotPlayer",
          icon: this.$cdnpath("images/player/potplayer.png"),
          scheme: "potplayer://" + this.videoUrl,
        },
        {
          name: "VLC",
          icon: this.$cdnpath("images/player/vlc.png"),
          scheme: "vlc://" + this.videoUrl,
        },
        {
          name: "Thunder",
          icon: this.$cdnpath("images/player/thunder.png"),
          scheme: "thunder://" + this.getThunder,
        },
        {
          name: "Aria2",
          icon: this.$cdnpath("images/player/aria2.png"),
          scheme: 'javascript:alert("暂未实现")',
        },
        {
          name: "nPlayer",
          icon: this.$cdnpath("images/player/nplayer.png"),
          scheme: "nplayer-" + this.videoUrl,
        },
        {
          name: "MXPlayer(Free)",
          icon: this.$cdnpath("images/player/mxplayer.png"),
          scheme:
            "intent:" +
            this.videoUrl +
            "#Intent;package=com.mxtech.videoplayer.ad;S.title=" +
            this.title +
            ";end",
        },
        {
          name: "MXPlayer(Pro)",
          icon: this.$cdnpath("images/player/mxplayer.png"),
          scheme:
            "intent:" +
            this.videoUrl +
            "#Intent;package=com.mxtech.videoplayer.pro;S.title=" +
            this.title +
            ";end",
        },
      ];
    },
    getThunder() {
      return Buffer.from("AA" + this.videoUrl + "ZZ").toString("base64");
    },
  },
};
</script>
