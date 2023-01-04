<template>
    <main class="login">
        <section class="forms">
            <form @submit.prevent="register">
                <h1>Register</h1>
                <input type="text" placeholder="Email" v-model="email" />
                <input type="password" placeholder="Password" v-model="password" />
                <input type="submit" value="Register" />
            </form>
        </section>
    </main>
</template>

<script>
import { ref } from 'vue';
import firebase from '../firebase';

export default {
    setup() {
        const email = ref("");
        const password = ref("");

        const Register = () => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(user => {
                    alert(user);
                })
                .catch(err => alert(err.message));
        }

        return {
            Register,
            email,
            password
        }
    }
}


/*
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const register_form = ref({});
        const store = useStore();

        const register = () => {
            store.dispatch('register', register_form.value);
        }

        return {
            register_form,
            register
        }
    }
}
*/
</script>

<style>

</style>