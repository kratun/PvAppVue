<template>
  <div>
    <div class="loading">
      
      <div>
        <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
      </div>
      <div class="loading">Loading ...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressSpinnerSizes"
};
</script>

<style lang="scss" scoped>
.md-progress-spinner {
  margin: 24px;
}
.loading {
  height: 100%;
  width: 10%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
