<template>
  <div class="">
    <v-breadcrumbs class="pl-4 text-uppercase" :items="values" divider=">"></v-breadcrumbs>
  </div>

</template>

<script>
export default {
  props:['values'],

  data() {
    return {
      breadItems: []
    }
  }

}
</script>

<style lang="css" scoped>
</style>
