<template>
 <HeaderComponent :heading="headingValue" />

  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-12">
        
        <ul class="list-group">
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-md-2">Title:</div> 
                    <div class="col-md-10">
                      <span class="fw-bold">{{tag.title}}</span>
                    </div> 
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-md-2">Description:</div>  
                    <div class="col-md-10"><span class="fw-bold">{{tag.description}}</span></div>
                  </div>
                </li>
                  
              </ul>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <router-link to="/tag/list" class="btn btn-success"> <i class="fa fa-arrow-alt-circle-left"></i> Back</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import HeaderComponent from  '@/components/HeaderComponent.vue'

export default {
    name:'TagDetails',
    components:{
      HeaderComponent
    },
    data() {
      return{
            headingValue : "Tag Details View",
            tagId: this.$route.params.tagId,
            tag:{},
            errorMessage:null
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
        tagDetailsAction: 'tagDetails',
      }),
    },
    computed: {
        ...mapGetters({
            tagDetails: 'gettagDetails',
        })
    }
}
</script>

<style>

</style>