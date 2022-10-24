<template>
  <div class="data">
    <data-form></data-form>
  </div>
</template>

<script>
import DataForm from './components/DataForm.vue'

export default {
  name: 'DataComponent',
  components: {
    DataForm
  }
}
</script>

<style scoped>
.data {
  padding: 8px;
}
</style>
