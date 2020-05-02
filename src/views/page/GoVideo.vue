<template>
  <div class="content">
    <div class="video-content">
      <iframe
        width="100%"
        height="100%"
        :src="apiurl"
        frameborder="0"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        allowtransparency="true"
        allowfullscreen="true"
      ></iframe>
    </div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <span class="icon">
            <i class="fa fa-play-circle" aria-hidden="true"></i>
          </span>
          播放 /
          <span class="icon">
            <i class="fa fa-download" aria-hidden="true"></i>
          </span>
          下载
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <label class="label">下载地址</label>
            <div class="control">
              <input class="input" type="text" :value="decodeURIComponent(videourl)" />
            </div>
          </div>
          <div class="columns is-mobile is-multiline has-text-centered">
            <div class="column" v-for="(item,index) in players" v-bind:key="index">
              <p class="heading">
                <a :href="item.scheme+(item.name==='Thunder'?getThunder:videourl)">
                  <figure class="image is-48x48" style="margin: 0 auto;">
                    <img class="icon" :src="item.icon" />
                  </figure>
                </a>
              </p>
              <p class>{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      apiurl: "",
      videourl: "",
      players: [
        {
          name: "IINA",
          icon: "https://www.iina.io/images/iina-icon-60.png",
          scheme: "iina://weblink?url="
        },
        {
          name: "PotPlayer",
          icon: "https://cloud.jsonpop.cn/go2index/player/potplayer.png",
          scheme: "potplayer://"
        },
        {
          name: "VLC",
          icon: "https://cloud.jsonpop.cn/go2index/player/vlc.png",
          scheme: "vlc://"
        },
        {
          name: "Thunder",
          icon: "https://cloud.jsonpop.cn/go2index/player/thunder.png",
          scheme: "thunder://"
        },
        {
          name: "MXPlayer",
          icon: "https://cloud.jsonpop.cn/go2index/player/mxplayer.png",
          scheme: "intent:"
        },
        {
          name: "nPlayer",
          icon: "https://cloud.jsonpop.cn/go2index/player/nplayer.png",
          scheme: "nplayer-"
        }
      ]
    };
  },
  methods: {
    // render (path) {
    //   this.videourl = window.location.origin + path;
    //   this.apiurl =
    //     "https://api.jsonpop.cn/demo/blplyaer/?url=" + this.videourl;
    // },
  },
  mounted() {
    // 便于开发环境调试
    this.videourl = window.location.origin + window.location.pathname;
    this.apiurl = "https://api.jsonpop.cn/demo/blplyaer/?url=" + this.videourl;
  },
  computed: {
    getThunder() {
      return Buffer.from("AA" + this.videourl + "ZZ").toString("base64");
    }
  }
};
</script>