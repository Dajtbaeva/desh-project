<template>
  <div class="DefaultLayout text-black h-full w-full gradient">
    <slot />
  </div>
</template>
<style>
.gradient {
  background-color: linear-gradient(90deg, #20dec5 0%, #98efbf 100%);
  backdrop-filter: blur(30px);
}
</style>
