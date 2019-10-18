<template>
    <b-container>
        <form @submit.prevent="Login">
             <b-form-group
                id="fieldset-1"
                label="Email"
                label-for="input-1"
                >
                <b-form-input id="input-1" v-model="email" type="email" trim></b-form-input>
            </b-form-group>
             <b-form-group
                id="fieldset-2"
                label="Senha"
                label-for="input-2"
                >
                <b-form-input id="input-2" v-model="senha" type="password" trim></b-form-input>
            </b-form-group>
             <b-form-group
                id="fieldset-2"
                >
                <b-button type="submit">Entrar</b-button>
            </b-form-group>
        </form>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            senha: '',
        }
    },
    methods: {
        Login() {
            let data = {
                email: this.email,
                senha: this.senha
            }
            this.$http.post("usuarios/login", data)
                .then((response) => {
                    if(response.data && response.data.token) {
                        localStorage.token  = response.data.token
                        this.$router.push("/")
                    } else {
                        alert("Erro ao realizar login")
                    }
                })
                .catch((err) => {
                    alert(err.response.data)
                })
        }
    }
}
</script>