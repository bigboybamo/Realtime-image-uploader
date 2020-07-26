<template>
  <div id="app">
    <div class="container">
      <h3 class="text-center">Realtime Gallery <button class="btn btn-info" @click="showModal"><span class="glyphicon glyphicon-upload"></span></button></h3>
      <vodal :show="show" animation="zoom" @hide="show = false">
        <upload @submit="handleSubmit"></upload>
      </vodal>
      <gallery-list :images="images"></gallery-list>
    </div>
    <span v-show="spin" class="glyphicon glyphicon-repeat fast-right-spinner"></span>
  </div>
</template>

<script>
import Upload from './Upload.vue'
import GalleryList from './GalleryList.vue'
import axios from 'axios';
import cloudinary from 'cloudinary-core'
var Pusher = require('pusher-js');

export default {
  name: 'app',
  data () {
    return {
      images: [],
      show: false,
      cl: null,
      spin: false
    }
  },
  created() {
    this.spin = true;
    Pusher.logToConsole = true;
    var pusher = new Pusher('1045127', {
      encrypted: true,
      cluster: 'mt1'
    });

    var channel = pusher.subscribe('gallery');
    channel.bind('upload', (data) => {
      console.log(data.url)
      data.url = this.cl.url(data.public_id, {width: 500, height: 400, crop: "fill"})
      this.images.unshift(data)
    });
    this.cl = new cloudinary.Cloudinary({cloud_name: 'dousncxte', secure: true})
    axios.get('http://localhost:3001')
      .then(({data}) => {
        this.spin = false
        this.images = data.map(image => {
          image.url = this.cl.url(image.public_id, {width: 500, height: 400, crop: "fill"})
          return image;
        });
      })
  },
  methods: {
    showModal() {
      this.show = true
    },
    handleSubmit(model) {
      this.show = false;
      this.spin = true
      const formData = new FormData()
      formData.append('image', model.imageFile);
      formData.append('title', model.title);
      formData.append('description', model.description);
      
      axios.post('http://localhost:3001/upload', formData)
      .then(({data}) => {
        this.spin = false
      })
    }
  },
  components: {
    'gallery-list': GalleryList,
    'upload': Upload
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.glyphicon.fast-right-spinner {
    -webkit-animation: glyphicon-spin-r 1s infinite linear;
    animation: glyphicon-spin-r 1s infinite linear;
    position: absolute;
    right: 20%;
    top: 40px;
    font-size: 30px;
    color: #29b6f6 !important;
}

@keyframes glyphicon-spin-r {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
</style>
