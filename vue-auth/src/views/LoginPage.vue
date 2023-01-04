<template>
    <main class="login">
        <section class="forms">
            <form @submit.prevent="login">
                <h1>Login</h1>
                <input type="text" placeholder="Email" v-model="email" />
                <input type="password" placeholder="Password" v-model="password" />
                <input type="submit" value="Login" />
                <p>Need an account? <router-link to="/register">Register here </router-link></p>
            </form>
        </section>
    </main>
</template>

<script>
import { ref } from 'vue'
import firebase from '../firebase'

export default {
    setup() {
        const email = ref("");
        const password = ref("");

        const Login = () => {
            firebase
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(data => console.log(data))
            .catch(err => alert(err.message));
        }

        return {
            Login,
            email,
            password
        }
    }
}
//import { useStore } from 'vuex'

/*
export default {
    setup() {
        const login_form = ref({});
        const store = useStore();

        const login = async () => {
            store.dispatch('login', login_form.value);
        }

        return {
            login_form,
            login
        }
    }
}
*/
</script>

<style>

</style>