import Vue from "vue";

var gofooter = Vue.component("gofooter", {
  props: {
    option: {
      path: "",
      file: {},
    },
  },
  watch: {
    option(val) {
    },
  },
  data: function () {
    return {
      content: "",
    };
  },
  components: {
  },
  methods: {
    render(path) {},
  },
  template: `
    <div class="content has-text-centered is-fixed-bottom">
        <div class="columns is-mobile is-centered">
            <div class="field is-grouped is-grouped-multiline">
                <div class="control">
                    <div class="tags has-addons">
                        <a class="tag is-dark" href="https://github.com/Aicirou/goindex-theme-acrou">goindex-template-acrou</a>
                        <span class="tag is-light">MIT &nbsp;<i class="fab fa-github"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `,
});

export default gofooter;
