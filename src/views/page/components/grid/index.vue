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
          <div class="card-image">
            <figure class="image is-square">
              <img
                v-if="file.thumbnailLink"
                v-lazy="thum(file.thumbnailLink)"
                alt="Placeholder image"
              />
            </figure>
          </div>
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.05);
  }
}
.g2-grid-view-folder {
  padding: 10px;
}
.iconfont {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
}
</style>
