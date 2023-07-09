<template>

  <input type="file" name="hello" id="" @change="show($event)">

</template>

<script setup>
function show(e) {
  console.log("hello")
  console.log(e.target.files[0])
}


</script>