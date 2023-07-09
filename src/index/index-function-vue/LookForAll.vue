<template>
  <div class="look-for-all-out">
    <span class="look-for-all-title">查 看 在 售 零 食</span>
  </div>
</template>

<script setup>

</script>

<style scoped>
.look-for-all-out {
  text-align: center;
  border-radius: 12px;
  width: 380px;
  height: 250px;
  background-color: #F7F9FA;
  border: 2px solid transparent;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.look-for-all-out:hover
{
  border: 2px solid #ff5000;
}

.look-for-all-title {
  transition: 0.2s;
  font-weight: 800;
  font-size: 20px;
}
.look-for-all-title:hover {
  color: #ff5000;
}
</style>