<template>
    <div class="about">
        <h1>This is an about page</h1>
        <button @click="login">Logga in</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                inloggningsuppg: {
                    username: "superadmin",
                    password: "BOBbo9tti!"
                }
            }

        },
        methods: {
            login() {
                this.$store.dispatch("authUser", this.inloggningsuppg)
            }
        }
    }

</script>
