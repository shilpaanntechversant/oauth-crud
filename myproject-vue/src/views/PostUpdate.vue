<template>
 <HeaderComponent :heading="headingValue" />

  <div class="container">
    <div class="row">
      <div class="col">
            <p v-if="successMessage" class="h4 text-success ">{{successMessage}}</p>
            <p v-if="message" class="h4 text-primary ">{{message}}</p>

      </div>

    </div>
  </div>
  <div class="container">
    <form @submit.prevent="postUpdate">
      <div class="row">
        <div class="col-md-4">
        
          <div class="mb-2">
            <input v-model="post.title" type="text" class="form-control" placeholder="Title">
            <p v-if="errorMessage.results && errorMessage.results.title" class="h6 text-danger ">{{errorMessage.results.title[0]}}</p>
          </div>
          <div class="mb-2">
            
            <textarea v-model="post.description" class="form-control" placeholder="Description"></textarea>
            <p v-if="errorMessage.results && errorMessage.results.description" class="h6 text-danger ">{{errorMessage.results.description[0]}}</p>
          </div>
          <div class="mb-2">
              <input type="file" accept="image/*" class="form-control" @change="handleImage">
              <p v-if="errorMessage.results && errorMessage.results.image" class="h6 text-danger ">{{errorMessage.results.image[0]}}</p>
            </div>
        </div>  
        <div class="col-md-4" v-if="post.image">
          <img class="user-img-big" :src="post.image" >

        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="drop-zone" 
            @drop="onDrop($event, 'tagList')"
            @dragover.prevent
            @dragenter.prevent
          >
            <div
              class="drag-el"
              v-for="item in tagList"
              :key="item.title"
              draggable="true"
              @dragstart="startDrag($event, item)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="drop-zone" 
            @drop="onDrop($event, 'selectetagList')"
            @dragover.prevent
            @dragenter.prevent
          >
            <div
              class="drag-el"
              v-for="item in selectetagList"
              :key="item.title"
              draggable="true"
              @dragstart="startDrag($event, item)"
            >
              {{ item.title }}
            </div>

          </div>
        </div>
        <div class="mb-2">
          <input type="submit" class="btn btn-success" value="Update">
        </div>
      </div>
    </form>
      
      
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import HeaderComponent from  '@/components/HeaderComponent.vue'

export default {
    name:'PostUpdate',
    components:{
      HeaderComponent
    },
    data(){
        return{
            headingValue : "Update Post",
            postId: this.$route.params.postId,
            post:{},
            title:'',
            description:'',
            image:'',
            successMessage:'',
            message:'',
            getTagList:[],
            tagList:[],
            selectetagList:[], 
            
            
        }
    },
    mounted(){
        this.isLoading = true;
        this.tagListAction().then((response) => {
          if (response.status === 200) {
            this.getTagList = response.data.results;
            this.isLoading = false;
          }
        });
        this.isLoading = true;
        this.postDetailsAction(this.postId).then((response) => {
        if (response.status === 200) {
          this.post = response.data.results;
          this.selectetagList = response.data.results.tag
          let ids = new Set(this.selectetagList.map(({ id }) => id));
          console.log(ids)
          this.tagList = this.getTagList.filter(({ id }) => !ids.has(id));
          console.log(this.tagList)
          this.isLoading = false;
        }
      });
      

    },
    methods:{
      ...mapActions({
        postUpdateAction: 'postUpdate',
        postDetailsAction: 'postDetails',
        tagListAction: 'tagFullList',
      }),
      postUpdate(){
          try{
            const postData = {
              id: this.postId,
              title: this.post.title,
              description: this.post.description,
              image: this.post.image,
              tag: this.selectetagList.map(function (tag) { return tag.id; })
            };
            console.log(postData)
            this.postUpdateAction(postData).then((response) => {
              this.errorMessage.results=[]
              if (response.data.status.code === 200){
                window.scrollTo(0, 0);
                this.successMessage =response.data.status.message
                setTimeout(() => {
                  this.successMessage = '';
                }, 3000);
                setTimeout( () => this.$router.push({ path: '/post/list'}), 3000);
                //return this.$router.push('/')
              }else{
                this.message ='Some Error Occured. Can you please try again'
                setTimeout(() => {
                  this.message = '';
                }, 3000);

                //return this.$router.push('/register')

              }
            });
          }
        catch(error){
          console.log(error.response.data.results)
          this.errorMessage=error.response.data.results
          // return this.$router.push('/register')
        }
      },
      startDrag(evt, item) {
        evt.dataTransfer.dropEffect = 'move'
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('itemID', item.id)
      },
      onDrop(evt, list) {
        const itemID = evt.dataTransfer.getData('itemID')
        if(list == 'tagList'){
          const tag =  this.selectetagList.find((item) => item.id == itemID)
          let index = this.selectetagList.findIndex(item => item.id  == itemID)
          this.selectetagList.splice(index, 1)
          this.tagList.push(tag)
        }else{
         const tag =  this.tagList.find((item) => item.id == itemID)
         let index = this.tagList.findIndex(item => item.id  == itemID)
         this.tagList.splice(index, 1)
         this.selectetagList.push(tag)


        }
      },
      handleImage(e){
        const selectedImage = e.target.files[0];
        // this.createBase64Image(selectedImage);
        const render = new FileReader();
        render.onload = (e) =>{
          this.post.image = e.target.result;
        }
        render.readAsDataURL(selectedImage)
      },
    },
    computed: {
    ...mapGetters({
        successMessage: 'getPostSuccess',
        errorMessage: 'getPostError',
        postDetails: 'getpostDetails',

      }),
    }
}
</script>

<style>

</style>