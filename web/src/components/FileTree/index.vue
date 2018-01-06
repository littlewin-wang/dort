<template>
  <div class="file-tree">
    <div class="file-empty">
      <p>NO FILE. WAIT FOR LOADING.</p>
    </div>
    <div class="file-container">
      <input type="text" class="search" v-model="searchInput">
      <div class="content">

      </div>
      <a class="action" href="">ALL READ</a>
    </div>
  </div>
</template>
