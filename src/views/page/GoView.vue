<template>
  <div>
    <bread-crumb ref="breadcrumb"></bread-crumb>
    <router-view></router-view>
  </div>
</template>
<script>
import BreadCrumb from "../common/BreadCrumb";
export default {
  components: {
    BreadCrumb,
  },
};
</script>
