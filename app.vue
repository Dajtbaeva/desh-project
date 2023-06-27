<template>
  <div>
    <NuxtLayout>
      <div>
        <div
          class="text-center p-5 mt-24 flex flex-col justify-center items-center content-center rounded"
          v-if="!isLogged"
        >
          <h1 class="text-center text-teal-500 pt-5">SHED</h1>
          <h2 class="p-5">Please login!</h2>
          <p>Username <input type="text" [(ngModel)]="username" /></p>
          <p>Password <input type="password" [(ngModel)]="pswd" /></p>
          <button class="btn_in" (click)="login()" type="submit">Login</button>
        </div>
        <div class="content" v-else>
          <div class="main">
            <Header />
          </div>
          <NuxtPage />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script>
export default {
  setup() {
    const isLogged = ref(true);
    const username = ref("");
    const password = ref("");
    const userRole = ref("");
    const orgId = ref("");

    const login = () => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("org_id", data.org_id);
      this.router.navigate([`/${data.role}`]);
      this.is_logged = true;
      this.username = "";
      this.pswd = "";
    };
    const logout = () => {
      is_logged.value = false;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user_id");
      localStorage.removeItem("org_id");
    };
    return {
      isLogged,
      login,
      logout,
    };
  },
};
</script>
