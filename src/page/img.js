import Vue from "vue";

var goimg = Vue.component("goimg", {
  data: function () {
    return {
      imgurl: "",
    };
  },
  methods: {
    render(path) {
        this.imgurl = path;
    },
  },
  template: `
    <div class="content">
        <figure class="image">
            <img :src="imgurl" />
        </figure>
    </div>
  `,
});

export default goimg;
