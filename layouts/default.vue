<template>
  <div class="DefaultLayout text-black h-screen gradient">
    <slot />
  </div>
</template>
<style>
.gradient {
  background-color: linear-gradient(90deg, #20dec5 0%, #6edca0 100%);
  backdrop-filter: blur(10px);
}
</style>
