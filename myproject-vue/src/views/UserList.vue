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

  
  
  <div class="container mt-3 user-listing">
    <div class="row">
    <div class="col-md-6" v-for="user of usersList" :key="user.id"> 
        <div class="card my-2 list-group-item-success shadow-lg" >
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-sm-4">
                  <img class="user-img" src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png">
              </div>
              <div class="col-sm-7">
                <ul class="list-group">
                  <li class="list-group-item">Username: <span class="fw-bold">{{user.username}} </span></li>
                  <li class="list-group-item">Email: <span class="fw-bold">{{user.email}}</span></li>
                </ul>

              </div>
              <!-- <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                <router-link to="" class="btn btn-warning my-1">
                  <i class="fa fa-eye"></i>
                </router-link>
                <router-link to="" class="btn btn-primary my-1">
                  <i class="fa fa-pen"></i>
                </router-link>
                <button class="btn btn-danger my-1" ><i class="fa fa-trash"></i></button>
              </div> -->
            </div>
          </div>
        </div>
    </div>
    <p class="float-end">
      <button class="button btn btn-sm btn-primary m-1" v-if="previousValue" @click="prevPage">Previous</button> 
      <button class="button btn btn-sm btn-primary m-1" v-if="nextValue" @click="nextPage">Next</button>
      </p>
    </div>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import SpinnerComponent from  '@/components/SpinnerComponent.vue'
import HeaderComponent from  '@/components/HeaderComponent.vue'

export default {
    name:'UserList',
    components:{
      SpinnerComponent,
      HeaderComponent,
    },
    data(){
      return{
        headingValue : "User Listing Page",
        loading:false,
        errorMessage:null,
        usersList:[],
        nextValue:null,
        previousValue:null,
        pageParam:1,
      }
    },
    mounted(){
      this.isLoading = true;
      this.userListAction(this.pageParam).then((response) => {
         console.log('dsd', response.status)
        if (response.status === 200) {
          this.usersList = response.data.results;
          this.nextValue= response.data.next;
          this.previousValue= response.data.previous;
          this.isLoading = false;
        }
      });
     this.startSlide();
    },
    methods:{
      ...mapActions({
        userListAction: 'userList',
      }),
      startSlide: function() {
        this.timer = setInterval(this.next, 4000);
      },
      
      prevPage(){
          this.pageParam=this.previousValue.split("page=")[1]
          if(this.pageParam === undefined){
            this.pageParam =1
          }
          
          this.isLoading = true;
          this.userListAction(this.pageParam).then((response) => {
            console.log('dsd', response.status)
            if (response.status === 200) {
              this.usersList = response.data.results;
              this.nextValue= response.data.next;
              this.previousValue= response.data.previous;
              this.isLoading = false;
            }
          });
          
        },
        nextPage(){
          this.pageParam=this.nextValue.split("page=")[1]
          
          this.isLoading = true;
          this.userListAction(this.pageParam).then((response) => {
            console.log('dsd', response.status)
            if (response.status === 200) {
              this.usersList = response.data.results;
              this.nextValue= response.data.next;
              this.previousValue= response.data.previous;
              this.isLoading = false;
            }
          });
        },
      next: function() {
        this.currentIndex += 1;
      },
      prev: function() {
        this.currentIndex -= 1;
      },
    },
    computed: {
      ...mapGetters({
        userList: 'getUserList',
      }),
      currentImg: function() {
        return this.images[Math.abs(this.currentIndex) % this.images.length];
      }
    }
    
}
</script>

<style>

</style>