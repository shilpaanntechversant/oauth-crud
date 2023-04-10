<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">
          Login
        </p>
        <p class="fst-italic">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

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
          
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="loginUser">
          <div class="mb-2">
            <input v-model="userName" type="text" class="form-control" placeholder="UserName">
            <p v-if="loginErrors.results && loginErrors.results.username" class="h6 text-danger ">{{loginErrors.results.username[0]}}</p>
          </div>
          <div class="mb-2">
            
            <input v-model="password" type="password" class="form-control" placeholder="Password">
            <p v-if="loginErrors.results && loginErrors.results.password" class="h6 text-danger ">{{loginErrors.results.password[0]}}</p>
          
          </div>
          
          
          <div class="mb-2">
            <input type="submit" class="btn btn-success" value="Login">
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <img class="user-img-big" src="https://w7.pngwing.com/pngs/340/956/png-transparent-profile-user-icon-computer-icons-user-profile-head-ico-miscellaneous-black-desktop-wallpaper.png" >

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name:'LoginView',
    data(){
        return{
            
            userName:'',
            password:'',
            successMessage:'',
            message:''
        }
    },
    methods:{
      ...mapActions({
        userLoginAction: 'userLogin',
      }),
      loginUser(){
  
          try{
            const userData = {
              username: this.userName,
              password: this.password,
            };
            this.userLoginAction(userData).then((response) => {
              this.loginErrors.results=[]

              if (response.data.status.code === 200){
                this.successMessage =''
                localStorage.setItem('token',response.data.results.token)
                localStorage.setItem('userId',response.data.results.id)
                localStorage.setItem('username',response.data.results.username)
                window.scrollTo(0, 0);
                this.successMessage =response.data.status.message
                setTimeout(() => {
                  this.successMessage = '';
                }, 3000);
                setTimeout( () => this.$router.push({ path: '/user/list'}), 3000);
                //return this.$router.push('/')
              }else{
                this.message ='Some Error Occured. Can you please try again'
                
                setTimeout( () => this.$router.push({ path: '/login'}), 5000);

                //return this.$router.push('/register')

              }
            });
          }
        catch(error){
          console.log(error.response.data.results)
          this.loginErrors=error.response.data.results
          // return this.$router.push('/register')
        }
        
        

      }
    },
    computed: {
    ...mapGetters({
        loginSuccess: 'getLoginSuccess',
        loginErrors: 'getLoginErrors',
      }),
    }
}
</script>

<style>

</style>