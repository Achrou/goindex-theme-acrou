import Vue from "vue";
import { get_file } from "@/utils/AcrouUtil";

var gocheck = Vue.component("gocheck", {
  created() {
    if(!window.gdconfig){
      this.show = true
    }
  },
  data: function () {
    return {
      show: false,
    };
  },
  components: {
  },
  methods: {
    close() {
      this.show = false
    }
  },
  template: `
    <div class="notification check-notification is-success is-light" v-if="show">
      <button class="delete" @click="close"></button>
      检测到有新版本，<a href="https://github.com/Aicirou/goindex-theme-acrou">前往GitHub</a></br>
      New version detected, <a href="https://github.com/Aicirou/goindex-theme-acrou">Go to GitHub</a>
    </div>
  `,
});

export default gocheck;
