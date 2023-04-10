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
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="tagAdd">
          <div class="mb-2">
            <input v-model="title" type="text" class="form-control" placeholder="Title">
            <p v-if="errorMessage && errorMessage.results.title" class="h6 text-danger ">{{errorMessage.results.title[0]}}</p>
          </div>
          <div class="mb-2">
            
            <textarea v-model="description" class="form-control" placeholder="Description"></textarea>
            <p v-if="errorMessage && errorMessage.results.description" class="h6 text-danger ">{{errorMessage.results.description[0]}}</p>
          </div>
          <div class="mb-2">
            <input type="submit" class="btn btn-success" value="Create">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import HeaderComponent from  '@/components/HeaderComponent.vue'

export default {
    name:'TagCreate',
    components:{
      HeaderComponent
    },
    data(){
        return{
            headingValue : "Add New Tag",
            title:'',
            description:'',
            successMessage:'',
            message:'',            
        }
    },
    methods:{
      ...mapActions({
        tagCreateAction: 'tagCreate',
      }),
      tagAdd(){
          try{
            const tagData = {
              title: this.title,
              description: this.description,
            };
            console.log(tagData)
            this.tagCreateAction(tagData).then((response) => {
              this.errorMessage=[]

              if (response.data.status.code === 200){
                window.scrollTo(0, 0);
                this.successMessage =response.data.status.message
                setTimeout(() => {
                  this.successMessage = '';
                }, 3000);
                setTimeout( () => this.$router.push({ path: '/tag/list'}), 3000);
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
    },
    computed: {
    ...mapGetters({
        successMessage: 'getPostSuccess',
        errorMessage: 'getPostError',
      }),
    }
}
</script>

<style>
</style>