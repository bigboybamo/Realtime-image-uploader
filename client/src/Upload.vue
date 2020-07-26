<template>
  <div class="upload">
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" v-model="model.title" />
      </div>
      <div class="form-group">
        <label>Image</label>
        <input type="file" class="form-control" @change="handleUpload($event.target.files)" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea row="5" class="form-control" v-model="model.description"></textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-info">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        title: '',
        description: '',
        imageFile: null
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.model)
    },
    handleUpload(files) {
      this.model.imageFile = files[0];
    }
  }
}
</script>

<style lang="sass">

</style>
