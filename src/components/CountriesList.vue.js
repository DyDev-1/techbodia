/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Fuse from 'fuse.js';
import CountryModal from '@/components/ModalCountry.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// State Variables
const countries = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const rowsPerPage = 25;
const selectedCountry = ref(null);
const filteredCountries = ref([]);
const fuse = ref(null);
const sortBy = ref('asc');
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
    }
    else {
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
    if (currentPage.value > 1)
        currentPage.value--;
};
const nextPage = () => {
    if (currentPage.value < totalPages.value)
        currentPage.value++;
};
// Modal Function
const showModal = (country) => {
    selectedCountry.value = country;
};
// Fetch data on mount
onMounted(fetchCountries);
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6  min-h-screen") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.searchCountries) }, value: ((__VLS_ctx.searchQuery)), type: ("text"), placeholder: ("Search Country"), ...{ class: ("p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ ...{ onChange: (__VLS_ctx.sortCountries) }, name: (""), id: (""), value: ((__VLS_ctx.sortBy)), ...{ style: ({}) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("asc"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("desc"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({ ...{ class: ("w-full bg-white border border-gray-300 rounded-md overflow-hidden") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({ ...{ class: ("bg-gray-200") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("p-2 border") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("p-2 border") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("p-2 border") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("p-2 border") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("p-2 border") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("p-2 border") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("p-2 border") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [country] of __VLS_getVForSourceType((__VLS_ctx.paginatedCountries))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({ key: ((country.cca3)), ...{ class: ("even:bg-gray-50") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ ...{ class: ("p-2 border") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((country.flags.png)), alt: ("Flag"), ...{ class: ("w-12 h-auto rounded") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ ...{ class: ("p-2 border") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.showModal(country);
                } }, href: ("#"), ...{ class: ("text-blue-500 hover:underline") }, });
        (country.name.official);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ ...{ class: ("p-2 border") }, });
        (country.cca2);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ ...{ class: ("p-2 border") }, });
        (country.cca3);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ ...{ class: ("p-2 border") }, });
        (country.altSpellings.join(', '));
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ ...{ class: ("p-2 border") }, });
        if (country.idd) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (country.idd.root);
            (country.idd.suffixes.join(', '));
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center mt-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.previousPage) }, ...{ class: ("px-4 py-2 bg-gray-500 text-black rounded-md hover:bg-gray-600") }, disabled: ((__VLS_ctx.currentPage === 1)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-gray-700") }, });
    (__VLS_ctx.currentPage);
    (__VLS_ctx.totalPages);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.nextPage) }, ...{ class: ("px-4 py-2 bg-gray-500 text-black rounded-md hover:bg-gray-600") }, disabled: ((__VLS_ctx.currentPage === __VLS_ctx.totalPages)), });
    if (__VLS_ctx.selectedCountry) {
        // @ts-ignore
        [CountryModal,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(CountryModal, new CountryModal({ ...{ 'onClose': {} }, country: ((__VLS_ctx.selectedCountry)), }));
        const __VLS_1 = __VLS_0({ ...{ 'onClose': {} }, country: ((__VLS_ctx.selectedCountry)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        let __VLS_5;
        const __VLS_6 = {
            onClose: (...[$event]) => {
                if (!((__VLS_ctx.selectedCountry)))
                    return;
                __VLS_ctx.selectedCountry = null;
            }
        };
        let __VLS_2;
        let __VLS_3;
        var __VLS_4;
    }
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['min-h-screen'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['bg-gray-200'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['even:bg-gray-50'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['w-12'];
    __VLS_styleScopedClasses['h-auto'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['text-blue-500'];
    __VLS_styleScopedClasses['hover:underline'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-gray-500'];
    __VLS_styleScopedClasses['text-black'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['hover:bg-gray-600'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-gray-500'];
    __VLS_styleScopedClasses['text-black'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['hover:bg-gray-600'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CountryModal: CountryModal,
            searchQuery: searchQuery,
            currentPage: currentPage,
            selectedCountry: selectedCountry,
            sortBy: sortBy,
            searchCountries: searchCountries,
            sortCountries: sortCountries,
            paginatedCountries: paginatedCountries,
            totalPages: totalPages,
            previousPage: previousPage,
            nextPage: nextPage,
            showModal: showModal,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
