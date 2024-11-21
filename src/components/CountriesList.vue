<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Fuse from 'fuse.js';
import CountryModal from './ModalCountry.vue';

// State Variables
const countries = ref<any[]>([]);
const searchQuery = ref('');
const currentPage = ref(1);
const rowsPerPage = 25;
const selectedCountry = ref<any | null>(null);
const filteredCountries = ref<any[]>([]);
const fuse = ref<Fuse<any> | null>(null);
const sortBy = ref<'asc'|'desc'>('asc')

// Fetch Countries Data
const fetchCountries = async () => {
  const { data } = await axios.get('https://restcountries.com/v3.1/all');
  countries.value = data;
  filteredCountries.value = data;

  // Fuse.js for Fuzzy Search
  fuse.value = new Fuse(data, {
    keys: ['name.official'],
    threshold: 0.4,
  });
};

// Search Function
const searchCountries = () => {
  if (searchQuery.value) {
    filteredCountries.value = fuse.value?.search(searchQuery.value).map((res) => res.item) ?? [];
  } else {
    filteredCountries.value = countries.value;
  }
};

// Sort Function
const sortCountries = () => {
  
  filteredCountries.value.sort((a, b) => {
    const nameA = a.name.official.toLowerCase();
    const nameB = b.name.official.toLowerCase();
    return sortBy.value === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });
};

// Pagination Computed Properties
const paginatedCountries = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  return filteredCountries.value.slice(start, start + rowsPerPage);
});

const totalPages = computed(() => Math.ceil(filteredCountries.value.length / rowsPerPage));

// Pagination Functions
const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Modal Function
const showModal = (country: any) => {
  selectedCountry.value = country;
};

// Fetch data on mount
onMounted(fetchCountries);
</script>

<template>
  <div class="p-6  min-h-screen">
    <div class="flex gap-4">  <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Country"
        class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        @input="searchCountries"
      />
      <select name="" id="" @change="sortCountries" v-model="sortBy">
        <option value="asc">Sort Asc</option>
        <option value="desc">Sort Desc</option>
      </select>
    </div>
    <!-- Search Bar -->
    

    <!-- Country Table -->
    <table class="w-full bg-white border border-gray-300 rounded-md overflow-hidden">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-2 border">Flags</th>
          <th class="p-2 border">Country Name</th>
          <th class="p-2 border">Cca2</th>
          <th class="p-2 border">Cca3</th>
          <th class="p-2 border">Native Country Name</th>
          <th class="p-2 border">Alternative Country Name</th>
          <th class="p-2 border">Calling Codes</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="country in paginatedCountries"
          :key="country.cca3"
          class="even:bg-gray-50"
        >
          <td class="p-2 border">
            <img :src="country.flags.png" alt="Flag" class="w-12 h-auto rounded" />
          </td>
          <td class="p-2 border">
            <a
              href="#"
              class="text-blue-500 hover:underline"
              @click.prevent="showModal(country)"
            >
              {{ country.name.official }}
            </a>
          </td>
          <td class="p-2 border">{{ country.cca2 }}</td>
          <td class="p-2 border">{{ country.cca3 }}</td>
          <td class="p-2 border">
            <span v-if="country.name.nativeName">
              {{ Object.values(country.name.nativeName)[0].official }}
            </span>
          </td>
          <td class="p-2 border">{{ country.altSpellings.join(', ') }}</td>
          <td class="p-2 border">
            <span v-if="country.idd">
              {{ country.idd.root }}{{ country.idd.suffixes.join(', ') }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="flex justify-between items-center mt-4">
      <button
        class="px-4 py-2 bg-gray-500 text-black rounded-md hover:bg-gray-600"
        @click="previousPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <span class="text-gray-700">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        class="px-4 py-2 bg-gray-500 text-black rounded-md hover:bg-gray-600"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>

    <!-- Country Modal -->
    <CountryModal
      v-if="selectedCountry"
      :country="selectedCountry"
      @close="selectedCountry = null"
    />
  </div>
</template>
