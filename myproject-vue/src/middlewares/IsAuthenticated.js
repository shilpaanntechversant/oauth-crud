export  function IsAuthenticated(to, from, next) {
    const user = localStorage.getItem('token');
    console.log(user)
    if (user !== null) {
        next();
    //   const userObject = JSON.parse(user);
    //   if (userObject.role !== undefined
    //     && (userObject.role.find((role) => role === 'admin' || role === 'user')) !== undefined) { next(); }
    }
    next('/');
  }