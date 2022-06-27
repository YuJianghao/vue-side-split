<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <div flex items-center justify-center>
      <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" stroke="#65B687" stroke-width="10" />
        <rect x="30" y="10" width="10" height="80" fill="#65B687" />
      </svg>
    </div>
    <div>
      Vue Side Split
    </div>

    <RouterView />
    <Footer />
  </main>
</template>
