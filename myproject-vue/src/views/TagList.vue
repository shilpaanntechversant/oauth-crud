<template>
 <HeaderComponent :heading="headingValue" />

 <!--spinner -->
 <div v-if="loading === true">
  <div class="container">
    <div class="row">
      <div class="col">
        <SpinnerComponent/>
      </div>
    </div>
  </div>

 </div>
  <div class="container">
    <div class="row">
      <div class="col">
            <p v-if="successMessage" class="h4 text-success ">{{successMessage}}</p>
            <p v-if="message" class="h4 text-primary ">{{message}}</p>

      </div>

    </div>
  </div>
<div class="container mt-3">
  <div class="row">
    <div class="col-md-2">
      <router-link to="/tag/create" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Add New</router-link>      
    </div>
    <div class="col-md-10">
      <form @submit.prevent="searchValue">
        <div class="row">
          <div class="col">
            <input v-model="search" type="text" class="form-control" placeholder="Search Name">
          </div>
          <div class="col">
            <input type="submit" value="search" class="btn btn-outline-dark">
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<div class="container mt-3">
  
</div>
<div class="container mt-3">
  <table class="table table-border">
    <thead>
      <tr>
        <th @click="sortFieldFunction('id')" class="border-2 pd-2">
          Id <i class="fas fa-sort"></i>
        </th>
        <th @click="sortFieldFunction('title')" class="border-2 pd-2">
          Title <i class="fas fa-sort"></i>
        </th>
        <th class="border-2 pd-2">
          Action
        </th>
        
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items"
          :key="item.id">
        <td class="border-2 pd-2">
          {{item.id}}
        </td>
        <td class="border-2 pd-2">
          {{item.title}}
        </td>
        <td class="border-2 pd-2">
          <div class="col-sm-1 d-flex justify-content-center align-items-center">
              <router-link :to="`/tag/details/${item.id}`" class="btn btn-warning my-1">
                <i class="fa fa-eye"></i>
              </router-link>
              <router-link :to="`/tag/update/${item.id}`" class="btn btn-primary my-1">
                <i class="fa fa-pen"></i>
             </router-link>
              <button @click="tagDelete(item.id)" class="btn btn-danger my-1" ><i class="fa fa-trash"></i></button> 
            </div>           
        </td>
        
      </tr>
    </tbody>
  </table>
    <p class="float-end">
    <button class="button btn btn-sm btn-primary m-1" v-if="previous" @click="prevPage">Previous</button> 
    <button class="button btn btn-sm btn-primary m-1" v-if="next" @click="nextPage">Next</button>
    </p>
</div>


</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SpinnerComponent from  '@/components/SpinnerComponent.vue'
import HeaderComponent from  '@/components/HeaderComponent.vue'

export default {
    name:'TagList',
    components:{
      SpinnerComponent,
      HeaderComponent
    },
    data(){
      return{
        headingValue : "Tag Listing Page",
        loading:false,
        errorMessage:null,
        successMessage:'',
        message:'',
        items:[],
        next:null,
        previous:null,
        param:1,
        sort:'asc',
        sortField:null,
        sortParam:null,
        search:null,
      }
    },
    mounted(){
      
      this.isLoading = true;
      this.tagListAction(this.param).then((response) => {
        if (response.status === 200) {
          this.items = response.data.results.results;
          this.next= response.data.results.next;
          this.previous= response.data.results.previous;
          this.isLoading = false;
        }
      });
    },
    methods:{
      ...mapActions({
        tagListAction: 'tagList',
        tagDeleteAction: 'tagDelete',
      }),
        prevPage(){
          console.log(this.previous.split("page=")[1])
          this.param=this.previous.split("page=")[1]
          if(this.param === undefined){
            this.param =1
          }
          if(this.sortField){
              if(this.sort == 'asc'){
                this.sortParam = `${this.param}&ordering=${this.sortField}`
              }else{
                this.sortParam = `${this.param}&ordering=-${this.sortField}`
              }
          }else{
            this.sortParam= this.param 
          }
          this.isLoading = true;
          this.tagListAction(this.sortParam).then((response) => {
            if (response.status === 200) {
              this.items = response.data.results.results;
              this.next= response.data.results.next;
              this.previous= response.data.results.previous;
              this.isLoading = false;
            }
          });
        },
        nextPage(){
          this.param=this.next.split("page=")[1]
          if(this.sortField){
              if(this.sort == 'asc'){
                this.sortParam = `${this.param}&ordering=${this.sortField}`
              }else{
                this.sortParam = `${this.param}&ordering=-${this.sortField}`
              }
          }else{
            this.sortParam =this.param
          }
          this.isLoading = true;
          this.tagListAction(this.sortParam).then((response) => {
            if (response.status === 200) {
              this.items = response.data.results.results;
              this.next= response.data.results.next;
              this.previous= response.data.results.previous;
              this.isLoading = false;
            }
          });
        },
        sortFieldFunction(value){
          if(value === this.sortField){
            this.sort=(this.sort=='asc' ? 'desc' : 'asc')
          }else{
            this.sort ='asc'
          }
          this.sortField = value;
          if(this.sort == 'asc'){
              this.sortParam = `${this.param}&ordering=${value}`
          }else{
            this.sortParam = `${this.param}&ordering=-${value}`
          }

          this.tagListAction(this.sortParam).then((response) => {
            if (response.status === 200) {
              this.items = response.data.results.results;
              this.next= response.data.results.next;
              this.previous= response.data.results.previous;
              this.isLoading = false;
            }
          });
        },
        searchValue(){
          this.isLoading = true;
          this.param=1;
          this.sortParam = `${this.param}&search=${this.search}`
          this.tagListAction(this.sortParam).then((response) => {
            if (response.status === 200) {
              this.items = response.data.results.results;
              this.next= response.data.results.next;
              this.previous= response.data.results.previous;
              this.isLoading = false;
            }
          });
        },
        tagDelete(tagId){
          try{
            this.tagDeleteAction(tagId).then((response) => {
              if (response.data.status.code === 200){
                
                window.scrollTo(0, 0);
                this.successMessage =response.data.status.message
                setTimeout(() => {
                  this.successMessage = '';
                }, 1000);
                setTimeout( () => this.$router.go() , 1000);
              }else{
                this.message ='Some Error Occured. Can you please try again'
                setTimeout(() => {
                  this.message = '';
                }, 3000);

              }
            });
          }
        catch(error){
          console.log(error.response.data.results)
          this.errorMessage=error.response.data.results
        }
        },
        
      },
      computed: {
        ...mapGetters({
          tagList: 'getTagList',
          successMessage: 'getTagSuccess',
          errorMessage: 'getTagError',
        })
      }
    
}
</script>

<style>

</style>