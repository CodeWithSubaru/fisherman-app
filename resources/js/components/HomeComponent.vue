<template>
    <div>from home component</div>
    <span v-for="user in users" :key="user.id">
        <p>{{ user.id }}</p>
    </span>
</template>

<script>
export default {
    props: ["users"],
};
</script>
