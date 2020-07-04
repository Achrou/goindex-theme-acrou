<template>
  <div class="content g2-content">
    <div v-if="options && options.api" class="video-content">
      <iframe
        width="100%"
        height="100%"
        :src="apiVideoUrl"
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
      <vue-plyr ref="plyr" :options="options">
        <video controls crossorigin playsinline>
          <source :src="videoUrl" type="video/mp4" />
          <track kind="captions" :src="subtitle" default />
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
              <input class="input" type="text" :value="downloadUrl" />
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
import { Hls, Flv } from "@/plugin/vplayer";
export default {
  data: function() {
    return {
      apiVideoUrl: "",
      videoUrl: "",
      downloadUrl: "",
      subtitle: "",
    };
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      let path = encodeURI(this.url);
      let index = path.lastIndexOf(".");
      this.suffix = path.substring(index + 1, path.length);
      this.loadSub(path, index);
      this.videoUrl = path;
      this.downloadUrl = window.location.origin + path;
      this.apiVideoUrl = this.options.api + this.videoUrl;
      if (!this.options.api) {
        let options = {
          src: this.videoUrl,
          autoplay: this.options.autoplay,
          media: this.player.media,
        };
        if (this.suffix === "m3u8") {
          Hls({
            ...options,
            callback: (hls) => {
              // Handle changing captions
              this.player.on("languagechange", () => {
                // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
                setTimeout(
                  () => (hls.subtitleTrack = this.player.currentTrack),
                  50
                );
              });
            },
          });
        } else if (this.suffix === "flv") {
          Flv(options);
        }
      }
    },
    loadSub(path, index) {
      this.subtitle = path.substring(0, index) + ".vtt";
    },
  },
  computed: {
    options() {
      var options = window.themeOptions.video;
      return {
        ...options,
        autoplay: options.autoplay || false,
        invertTime: options.invertTime || false,
        controls: options.controls || [
          "play-large",
          "restart",
          "play",
          "progress",
          "current-time",
          "duration",
          "mute",
          "volume",
          "captions",
          "settings",
          "pip",
          "airplay",
          "download",
          "fullscreen",
        ],
        settings: options.settings || ["quality", "speed", "loop"]
      };
    },
    player() {
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
