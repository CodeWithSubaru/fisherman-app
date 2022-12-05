<template>
    <button
        :class="
            backgroundColor +
            ' transition-all duration-300 text-white px-6 py-3 tracking-wide font-medium rounded-lg text-sm'
        "
    >
        <slot />
        <template
            v-if="loading"
            :class="{ display: disable ? 'none' : 'block' }"
        >
            <span>Processing...</span>
        </template>
    </button>
</template>

<script>
export default {
    props: ["bg", "loading", "disable"],

    data() {
        return {
            backgroundColor: this.bg.join(" "),
        };
    },
};
</script>
