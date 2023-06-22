<template>
  <nav id="header" class="fixed w-full z-30 top-0 text-white">
    <div
      class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-3 px-5"
    >
      <div class="pl-4 flex items-center">
        <a
          class="text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          href="#"
        >
          DESH
        </a>
      </div>
      <div
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
        id="nav-content"
      >
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-3">
            <a
              class="inline-block text-black no-underline hover:text-gray-800 hover:underline py-2 px-4"
              href="#"
              >Available rooms</a
            >
          </li>
          <li class="mr-3">
            <a
              class="inline-block text-black no-underline hover:text-gray-800 hover:underline py-2 px-4"
              href="#"
              >Settings</a
            >
          </li>
        </ul>
        <button
          id="navAction"
          class="mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
    <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
  </nav>
</template>
