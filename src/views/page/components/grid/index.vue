<template>
  <div class="g2-grid-view">
    <div class="columns is-multiline">
      <div
        class="column is-one-quarter"
        v-for="(file, index) in folders"
        :key="'folder_' + index"
        @click="go(file)"
      >
        <div class="card g2-grid-view-card g2-grid-view-folder">
          <div class="media">
            <div class="content">
              <svg class="iconfont" aria-hidden="true">
                <use :xlink:href="getIcon(file.mimeType)" />
              </svg>
              {{ file.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <div
        class="column is-one-quarter"
        v-for="(file, index) in files"
        :key="'file_' + index"
        @click="go(file, 'view')"
      >
        <div class="card g2-grid-view-card">
          <div
            :class="
              'card-image' +
                (file.mimeType.indexOf('video') != -1
                  ? ' g2-grid-view-play'
                  : '')
            "
          >
            <figure class="image is-square">
              <img
                v-if="file.thumbnailLink"
                v-lazy="thum(file.thumbnailLink)"
                :alt="file.name"
              />
            </figure>
          </div>
          <div class="media g2-grid-view-file">
            <div class="content">
              <svg class="iconfont" aria-hidden="true">
                <use :xlink:href="getIcon(file.mimeType)" />
              </svg>
              {{ file.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GridView",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    getIcon: {
      type: Function,
    },
    go: {
      type: Function,
    },
    thum: {
      type: Function,
    },
  },
  data: function() {
    return {};
  },
  computed: {
    folders() {
      return this.data.filter((item) => item.isFolder);
    },
    files() {
      return this.data.filter((item) => !item.isFolder);
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.g2-grid-view {
  margin-bottom: 2rem;
}
.media-left {
  margin-right: 0.5rem;
}
.content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  font-size: 14px;
}
.column {
  cursor: pointer;
}
.g2-grid-view-card {
  //   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  .card-image img {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4), 0 0 1px rgba(0, 0, 0, 0.05);
  }
  .g2-grid-view-file {
    .content {
      padding: 8px;
    }
  }
}
.g2-grid-view-folder {
  padding: 10px;
}
.g2-grid-view-play {
  &:before {
    z-index: 10;
    background-image: url("https://cloud.jsonpop.cn/go2index/vue/play.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: "";
  }
}
.iconfont {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
}
</style>
