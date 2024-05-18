<template>
  <div id="app" class="container mb-3 pt-4">
    <!-- CONTENT START -->
    <!-- TODO: ADD TITLE-ATTRIBUTES TO BUTTONS OF ACCORDIONS AND POSSIBLY OF COLOUR-STOP-BUTTONS -->
    <router-view class="rounded border p-3" />
    <!-- CONTENT END -->
  </div>
</template>

<style lang="scss">
// BOOTSTRAP VARIABLES IMPORT
@import "~bootstrap/scss/functions", "~bootstrap/scss/variables";
// BOOTSTRAP VARIABLES IMPORT END

// LOCAL SCOPE
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $gray-800;

  // NAVIGATION CLASSES
  #nav {
    a {
      font-weight: bold;
      color: $gray-800;
      &.router-link-exact-active {
        color: $primary;
      }
    }
  }
  // NAVIGATION CLASSES END
}
// LOCAL SCOPE END
</style>
