<template>

  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">{{heading}}
          <span v-if="!token">
              <router-link to="/register" class="btn btn-success btn-sm"><i class="fa fa-user-circle"></i> Register</router-link>

              <router-link  to="/login" class="btn btn-success btn-sm m-1"><i class="fa fa-sign-in"></i> Login</router-link>
          </span>
          <span v-else> 
            <router-link  to="/tag/list" class="btn btn-success btn-sm m-1"><i class="fa fa-tag"></i> Tag</router-link>

            <button  @click="logout(token)" class="btn btn-success btn-sm m-1"><i class="fa fa-sign-out"></i> Logout</button>
          </span>
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
            <p v-if="logoutErrors.results" class="h4 text-primary ">{{logoutErrors.results}}</p>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name:'HeaderComponent',
  props:{
    heading:{
                type:String,
                required: true,
                default: 'Header Page'
            }
  },
  data(){
    return{
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      successMessage:'',
      message:'',
    }
  },
  methods:{
      ...mapActions({
          userLogoutAction: 'userLogout',
        }),
      logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')   
        window.scrollTo(0, 0);
        this.successMessage ="Successfully Logged Out"
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        setTimeout( () => this.$router.push({ path: '/'}), 3000);
        // try{
        //   this.userLogoutAction(userToken).then((response) => {
        //     if (response.data.status.code === 200){

        //     localStorage.removeItem('token')
        //     localStorage.removeItem('userId')
        //     localStorage.removeItem('username')   
        //     window.scrollTo(0, 0);
        //     this.successMessage =response.data.status.message
        //     setTimeout(() => {
        //       this.successMessage = '';
        //     }, 3000);
        //     setTimeout( () => this.$router.push({ path: '/'}), 3000);

        //     } else{
        //         this.message ='Some Error Occured. Can you please try again'
                
        //         //return this.$router.push('/register')

        //       }
        //   });
        // }
        // catch(error){
        //   this.logoutErrors=error.response.data.status.message
        // }
        // localStorage.removeItem('token')

      }
    },
    computed: {
    ...mapGetters({
        logoutSuccess: 'getLogoutSuccess',
        logoutErrors: 'getLogoutErrors',
      }),
    }

}
</script>

<style>

</style>