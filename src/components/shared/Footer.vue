<template>

  <footer>
      Site design by Kratun @ {{getYear}}
  </footer>
</template>

<script>

export default {
  name: 'Footer',
  computed: {
    getYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style>
footer {
  margin-block-start: 5px;
  /* position:absolute; */
  /* top: 100px; */
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgb(10, 63, 207);
  color: white;
  text-align: center;
}
</style>
