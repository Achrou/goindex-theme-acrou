<template>
  <span
    class="icon"
    v-show="$route.meta.view === 'list'"
    :title="
      mode === 'list' ? $t('list.view.gridMode') : $t('list.view.listMode')
    "
    @click="toggleMode"
  >
    <i
      :class="'fa' + (mode === 'list' ? ' fa-th' : ' fa-th-list')"
      aria-hidden="true"
    ></i>
  </span>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("acrou/view", ["mode"]),
  },
  methods: {
    ...mapActions("acrou/view", ["toggle"]),
    toggleMode() {
      this.toggle(this.mode === "list" ? "grid" : "list");
    },
  },
};
</script>
