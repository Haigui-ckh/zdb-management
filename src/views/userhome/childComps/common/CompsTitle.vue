<template>
  <div id="comp-title">
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "CompsTitle"
}
</script>

<style scoped>
  #comp-title {
    width: 100%;
    margin-bottom: 10px;
  }

  #comp-title span {
    border-top:3px solid orange;
    padding: 5px;
    margin-left:  10px;
    font-size: 14px;    
    
  }

</style>