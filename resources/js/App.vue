<template>
    <nav>
        <router-link :to="{ name: 'home' }">Home</router-link>
        <router-link :to="{ name: 'about' }">About</router-link>
        <router-link :to="{ name: 'users' }">User</router-link>
    </nav>
    <main class="">
        <router-view></router-view>
    </main>
</template>

<script>
export default {
    data() {
        return { loading: true };
    },

    setup() {},
};
</script>
