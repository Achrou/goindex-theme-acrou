<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link is-arrowless" title="Setting">
      <i class="fa fa-cog" aria-hidden="true"></i>
    </a>
    <div class="navbar-dropdown is-left">
      <a class="navbar-item" @click="cleanCache">
        <span class="icon">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </span>
        {{ $t("setting.clear.text") }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    cleanCache() {
      new Promise((resolve) => {
        Object.keys(localStorage).forEach((item) => {
          if (item.indexOf("file_path_") !== -1) {
            localStorage.removeItem(item);
          }
        });
        resolve();
      }).then(() => {
        this.$notify({
          title: this.$t("notify.title"),
          message: this.$t("setting.clear.success"),
          type: "success",
        });
      });
    },
  },
};
</script>
