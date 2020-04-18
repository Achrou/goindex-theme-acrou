import Vue from "vue";

var govideo = Vue.component("govideo", {
  data: function () {
    return {
      apiurl: "",
      videourl: "",
      thunder: "",
    };
  },
  methods: {
    render(path) {
      this.videourl = window.location.origin + path;
    //   this.videourl =
    //     "https://oss.achirou.workers.dev/Movies/梨泰院Class/梨泰院Class.Itaewon.Class.EP01.2020.1080P.X264.AAC.CHS.mp4";
      this.apiurl =
        "https://api.jsonpop.cn/demo/blplyaer/?url=" + this.videourl;
      this.thunder =
        "thunder://" +
        Buffer.from("AA" + this.videourl + "ZZ").toString("base64");
    },
  },
  template: `
    <div>
        <iframe width="100%" height="600px;" :src="apiurl" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="true" allowfullscreen="true"></iframe>
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    <span class="icon"><i class="fa fa-play-circle" aria-hidden="true"></i></span>
                    播放 /
                    <span class="icon"><i class="fa fa-download" aria-hidden="true"></i></span>
                    下载
                </p>
            </header>
            <div class="card-content">
                <div class="content">
                    <a :href="'iina://weblink?url='+videourl">
                        <img class="icon" src="https://www.iina.io/images/iina-icon-60.png" />
                    </a>
                    <a :href="thunder">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xunlei"></use>
                        </svg>
                    </a>  
                </div>
            </div>  
        </div>
    </div>
  `,
});

export default govideo;
