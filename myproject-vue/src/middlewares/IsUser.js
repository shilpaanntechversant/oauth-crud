export  function IsUser(to, from, next) {
    const user = localStorage.getItem('token');
    if (user !== null) {
      next('/user/list');
    }
    next();
  }
  