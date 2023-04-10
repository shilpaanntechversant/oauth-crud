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
        <form @submit.prevent="tagUpdate">
          <div class="mb-2">
            <input v-model="tag.title" type="text" class="form-control" placeholder="Title">
            <p v-if="errorMessage && errorMessage.results.title" class="h6 text-danger ">{{errorMessage.results.title[0]}}</p>
          </div>
          <div class="mb-2">
            
            <textarea v-model="tag.description" class="form-control" placeholder="Description"></textarea>
            <p v-if="errorMessage && errorMessage.results.description" class="h6 text-danger ">{{errorMessage.results.description[0]}}</p>
          </div>
          
          <div class="mb-2">
            <input type="submit" class="btn btn-success" value="Update">
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
    name:'TagUpdate',
    components:{
      HeaderComponent
    },
    data(){
        return{
            headingValue : "Update Tag",
            tagId: this.$route.params.tagId,
            tag:{},
            title:'',
            description:'',
            successMessage:'',
            message:'',
            
            
        }
    },
    mounted(){
        this.isLoading = true;
        this.tagDetailsAction(this.tagId).then((response) => {
        if (response.status === 200) {
          this.tag = response.data.results;
          this.isLoading = false;
        }
      });
    },
    methods:{
      ...mapActions({
        tagUpdateAction: 'tagUpdate',
        tagDetailsAction: 'tagDetails',
      }),
      tagUpdate(){
          try{
            const tagData = {
              id: this.tagId,
              title: this.tag.title,
              description: this.tag.description,
            };
            this.tagUpdateAction(tagData).then((response) => {
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
        
        

      }
    },
    computed: {
    ...mapGetters({
        successMessage: 'getTagSuccess',
        errorMessage: 'getPostError',
        tagDetails: 'gettagDetails',

      }),
    }
}
</script>

<style>

</style>