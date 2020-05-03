<template>
  <a class="navbar-item" @click="handleClick">
    <i class="fa fa-search"></i>
  </a>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
