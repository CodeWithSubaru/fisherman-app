<template>
    <div v-if="success">{{ success.message }}</div>

    <Table :titles="titles">
        <tr v-for="(user, i) in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td class="flex gap-x-1">
                <Button
                    :bg="['bg-gray-900', 'hover:bg-gray-800']"
                    @click.self="edit(user)"
                    :disable="true"
                    ><span v-if="!loadingEdit"> Edit</span>
                </Button>
                <Button
                    :bg="['bg-red-700', 'hover:bg-red-600']"
                    @click.prevent="remove(user, i)"
                    :loading="loadingDelete"
                    ><span v-if="!loadingDelete">Delete</span></Button
                >
            </td>
        </tr>
    </Table>

    <form>
        <div class="form-group">
            <label for="name">Name</label>
            <input
                type="text"
                name="name"
                class="border-blue-500 border-2"
                v-model="form.name"
            />
        </div>

        <div class="form-group">
            <label for="name">Email</label>
            <input
                type="email"
                name="email"
                class="border-blue-500 border-2"
                v-model="form.email"
            />
        </div>

        <div class="form-group">
            <label for="name">Password</label>
            <input
                type="password"
                name="password"
                class="border-blue-500 border-2"
                v-model="form.password"
            />
        </div>

        <Button
            :bg="['bg-gray-800', 'hover:bg-gray-700']"
            @click.prevent="store"
            :loading="loadingSubmit"
            ><span v-if="!loadingSubmit"> Submit</span></Button
        >
    </form>

    <form class="formEdit">
        <div class="form-group">
            <label for="name">Name</label>
            <input
                type="text"
                name="name"
                class="border-blue-500 border-2"
                v-model="formEdit.name"
            />
        </div>

        <div class="form-group">
            <label for="name">Email</label>
            <input
                type="email"
                name="email"
                class="border-blue-500 border-2"
                v-model="formEdit.email"
            />
        </div>

        <div class="form-group">
            <label for="name">Password</label>
            <input
                type="password"
                name="password"
                class="border-blue-500 border-2"
                v-model="formEdit.password"
            />
        </div>

        <Button :bg="['bg-gray-900', 'bg-gray-800']" @click.prevent="update"
            >Submit</Button
        >
    </form>
</template>

<script>
import axios from "axios";
import Button from "./Button.vue";
import Table from "./Table.vue";

export default {
    components: { Button, Table },

    data() {
        return {
            users: [],
            titles: ["Id", "Name", "Email", "Action"],
            loading: false,
            loadingSubmit: false,
            form: {
                name: null,
                email: null,
                password: null,
            },
            formEdit: {
                name: null,
                email: null,
                password: null,
            },
            selectedId: null,
            success: null,
            error: [],
        };
    },

    mounted() {
        this.getAllUsers();
    },

    methods: {
        getAllUsers() {
            this.loading = true;
            axios
                .get("/api/users")
                .then((response) => {
                    this.users = response.data;
                    this.loading = false;
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        store() {
            axios
                .post("/api/users", this.form)
                .then((resp) => {
                    this.loadingSubmit = !this.loadingSubmit;
                    setTimeout(() => {
                        this.loadingSubmit = !this.loadingSubmit;
                        this.success = resp.data;
                        this.users.push(resp.data.data);
                        this.form.name = null;
                        this.form.email = null;
                        this.form.password = null;
                    }, 3000);
                })
                .catch((e) => {
                    console.log(e.response.data);
                });
        },

        update() {
            axios
                .put("api/users", this.formEdit)
                .then((resp) => console.log(resp))
                .catch((e) => console.log(e));
        },

        edit(user) {
            this.selectedId = user.id;
            this.formEdit.name = user.name;
            this.formEdit.email = user.email;
            this.formEdit.password = user.password;
        },

        remove(user, index) {
            axios
                .delete("/api/users/" + user.id)
                .then((resp) => {
                    this.users.splice(index, 1);
                    this.success = resp.data;
                })
                .catch((e) => console.log(e));
        },
    },
};
</script>
