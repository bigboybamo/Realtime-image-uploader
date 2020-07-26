<template>
  <div class="card">
    <h4 class="card-title">{{image.title}}</h4>
    <div class="card-image">
      <img :src="image.url" class="img-responsive"/>
    </div> 
    <p class="card-description">{{image.description}}</p> 
  </div>
</template>

<script>
export default {
  props: ['image']
}
</script>

<style lang="scss">
.card {
  box-shadow: 0 2px 20px 0 rgba(87,87,87,0.33);
  border-radius: 7px;
  position: relative;
  .card-title {
    padding: 10px 15px;
    margin: 0;
  }
  .card-description {
    padding: 10px 15px;
    margin: 0;
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    width: 100%;
  }
  &:hover {
    box-shadow: 0 5px 20px 0 rgba(87,87,87,0.9);
  }
}
</style>
