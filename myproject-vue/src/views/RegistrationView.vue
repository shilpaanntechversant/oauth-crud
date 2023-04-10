<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">
          Registration
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
        <form @submit.prevent="registerUser">
          <div class="mb-2">
            <input v-model="userName" type="text" class="form-control" placeholder="UserName">
            <p v-if="signupErrors.results && signupErrors.results.username" class="h6 text-danger ">{{signupErrors.results.username[0]}}</p>
          </div>
          <div class="mb-2">
            <input v-model="email" type="email" class="form-control" placeholder="Email">
            <p v-if="signupErrors.results && signupErrors.results.email" class="h6 text-danger ">{{signupErrors.results.email[0]}}</p>

          </div>
          <div class="mb-2">
            
            <input v-model="password" type="password" class="form-control" placeholder="Password">
            <p v-if="signupErrors.results && signupErrors.results.password" class="h6 text-danger ">{{signupErrors.results.password[0]}}</p>
          
          </div>
          <div class="mb-2">
            <input v-model="confirmPassword" type="password" class="form-control" placeholder="Confirm Password">
            <p v-if="signupErrors.results && signupErrors.results.confirm_password" class="h6 text-danger ">{{signupErrors.results.confirm_password[0]}}</p>
          
          </div>
          
          <div class="mb-2">
            <input type="submit" class="btn btn-success" value="Register">
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
    name:'RegistrationView',
    data(){
        return{
            userName:'',
            email:'',
            password:'',
            confirmPassword:'',
            successMessage:'',
            message:''
        }
    },
    methods:{
      ...mapActions({
        userSignupAction: 'userSignup',
      }),
      registerUser(){
        if(this.password != this.confirmPassword){
          this.signupErrors.results['confirm_password'] =['Confirm Password is not same as Password'];
        }else{
          try {
            const userData = {
              username: this.userName,
              email: this.email,
              password: this.password,
              confirm_password: this.confirmPassword,
            };
            this.userSignupAction(userData).then((response) => {
              this.signupErrors.results=[]
              this.userName = '';
              this.email = '';
              this.password = '';
              this.confirmPassword = '';
              if (response.data.status.code === 200) {
                window.scrollTo(0, 0);
                this.successMessage = response.data.status.message;
                setTimeout(() => {
                  this.successMessage = '';
                }, 3000);
                setTimeout( () => this.$router.push({ path: '/'}), 3000);

              } else {
                this.message ='Some Error Occured. Can you please try again'
                setTimeout(() => {
                      this.message = '';
                    }, 4000);
                setTimeout( () => this.$router.push({ path: '/register'}), 4000);                
              }
            });
          } catch (error) {
            console.log(error)
            this.message=error.response.data.results
          } 
          
        
        }
        

      }
    },
    computed: {
    ...mapGetters({
        signupErrors: 'getSignupErrors',
        signupSuccess: 'getSignupSuccess',
      }),
    }
}
</script>

<style>

</style>