import Vue from "vue";

var goimg = Vue.component("goimg", {
  data: function () {
    return {
      imgurl: "",
      display: false
    };
  },
  methods: {
    render(path) {
        this.imgurl = path;
    },
    loading(event) {
      if (event.target.complete == true) {
        this.display = true
      }
    }
  },
  template: `
    <div class="content">
        <figure class="image">
            <img :src="imgurl" :class="!display?'is-hidden':''" @load="loading" />
            <center :class="display?'is-hidden':''">
              <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
              <span class="sr-only">Loading...</span>
            </center>
        </figure>
    </div>
  `,
});

export default goimg;
