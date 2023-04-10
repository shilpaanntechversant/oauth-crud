<template>
  
  <HeaderComponent :heading="headingValue" />
  <div class="row">
         <div v-for="i in [currentIndex]" :key="i">
            <img class="slider-img"  :src="currentImg" />
        </div> 
      
    </div>
    <div>
      <a class="prev" @click="prev">&#10094; Previous</a>
      <a class="next" @click="next">&#10095; Next</a>
    </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
export default {
  name:'MyHome',
  components:{
    HeaderComponent,
  },
  data(){
    return{
      headingValue : "Home Page",
      images: [
          "https://images.unsplash.com/photo-1470608756445-2c9906b0680f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmlnJTIwc2l6ZXxlbnwwfHwwfHw%3D&w=1000&q=80",
          "https://wallpaperaccess.com/full/396368.jpg",
          "https://images.unsplash.com/photo-1608230566348-bb6dce3b574e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9zdCUyMHBvcHVsYXJ8ZW58MHx8MHx8&w=1000&q=80",
          "https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGlnaCUyMHJlcyUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80",
          "https://i.pinimg.com/736x/a5/50/44/a55044043e5464f84c4038559c87ab2f.jpg"
       ],
      timer: null,
      currentIndex: 1,
      
    }
    
    
  },
  mounted(){
      
     this.startSlide();
  },
    methods:{

      startSlide: function() {
        this.timer = setInterval(this.next, 4000);
      },
      next: function() {
        this.currentIndex += 1;
      },
      prev: function() {
        this.currentIndex -= 1;
      },
    },
    computed: {
      
      currentImg: function() {
        return this.images[Math.abs(this.currentIndex) % this.images.length];
      }
    }

}
</script>

<style>
.slider-img{
  height:400px;
  width:100%
}

.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0;
  text-decoration: none;
  user-select: none;
}

.next {
  right: 0;
}

.prev {
  left: 0;
}

.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.9);
}




</style>