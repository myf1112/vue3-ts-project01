<template>
  <div class="main">
    <h2>我是主页{{ $store.state.name }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {}
});
</script>
