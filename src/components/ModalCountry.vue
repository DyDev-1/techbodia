<template>
  <div class="modal text-black">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <div class="content">
        <img :src="country.flags.png">
      <p>Common Name: {{ country.name.common }}</p>
      <p>Official Name: {{ country.name.official }}</p>
      <p>cca2: {{ country.cca2 }}</p>
      <p>ccn3: {{ country.ccn3 }}</p>
      <p>cca3: {{ country.cca3 }}</p>
      <p>cioc: {{ country.cioc }}</p>
      <p>Independent: {{ country.independent ? "Yes" : "No" }}</p>
      <p>Currency: {{ currencies(country.currencies) }}</p>
      <p>Region: {{ country.region }}</p>
      <!-- <p>Languages: {{ languageData(country.languages) }}</p>
      <p>latlng: {{ country.latlng.join(", ") }}</p>
      <p>population: {{ country.population}}</p>
      <p>timezones: {{ country.timezones.join(", ") }}</p> -->
      <p>
        Map: 
        <a :href="country.maps.googleMaps" target="_blank">{{ country.maps.googleMaps }}</a>
      </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["country"]);

const currencies = (curr) => {
  if (!curr) return "No currencies available";
  return Object.entries(curr)
    .map(([code, details]) => `${details.name} (${details.symbol || "N/A"})`)
    .join(", ");
};

const languageData = (langs) => {
  if (!langs) return "No languages available";
  return Object.values(langs).join(", ");
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
}
.modal-content {
  color: black;
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
}
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content img{
  width: 200px;
}
.close {
  float: right;
  font-size: 24px;
  cursor: pointer;
}
</style>
