<template>
    <table>
        <thead>
            <tr>
                <th v-for="title of titles" :key="title">{{ title }}</th>
            </tr>
        </thead>

        <tbody>
            <slot />
        </tbody>

        <tfoot>
            <tr>
                <th v-for="title of titles" :key="title">{{ title }}</th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
export default {
    props: ["titles"],
};
</script>
