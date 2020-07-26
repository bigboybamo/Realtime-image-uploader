<template>
  <div>
    <div class="row" v-for="i in Math.ceil(images.length / 3)" :key="i">
      <div class="col-md-4" v-for="image in images.slice((i - 1) * 3, i * 3)" :key="image._id">
        <gallery-item :image="image">
        </gallery-item>
      </div>
    </div>
  </div>
</template>

<script>
import GalleryItem from './GalleryItem.vue'
export default {
  props: ['images'],
  components: {
    'gallery-item': GalleryItem
  }
}
</script>

<style lang="scss">
.row {
  margin-bottom: 30px !important;
}
</style>
