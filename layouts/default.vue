<template>
  <div class="bg-gradient-to-r from-teal-400 to-cyan-500 text-black">
    <slot />
  </div>
</template>
<style>
.gradient {
  background-color: linear-gradient(90deg, #20dec5 0%, #98efbf 100%);
  backdrop-filter: blur(30px);
}
</style>
