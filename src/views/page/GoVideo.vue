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
    <video v-else style="width:100%;" preload controls>
      <source :src="videoUrl" type="video/mp4" />
    </video>
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
      // 便于开发环境调试
      this.videoUrl = window.location.origin + encodeURI(this.url);
      this.apiUrl = this.player.api + this.videoUrl;
    },
  },
  activated() {
    this.render();
  },
  computed: {
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
