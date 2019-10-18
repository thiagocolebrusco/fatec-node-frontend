<template>
    <div id="app" class="container">
    
        <div id="mensagens">
            <div class="col s12">
                <ul class="list-unstyled" v-cloak>
                    <li v-for="(mensagem, index) in mensagens" :key="index">
                        <span class="date" v-if="mensagem.data">{{ mensagem.data }}</span>
                        <span class="name" v-if="mensagem.usuario">{{ mensagem.usuario.nome }}:</span>
                        <span class="text">
                            {{ mensagem.texto }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    
        <div class="row">
    
            <div class="col-12 col-sm-9">
                <input type="text" class="form-control" placeholder="Mensagem" v-model="texto"
                    @keyup.enter="sendMessage">
            </div>

            <button class="btn btn-primary" @click="sendMessage">Enviar</button>
    
        </div>
    

        <label for="">Situação: </label>
        <span> {{connected ? 'Conectado' : "Desconectado"}}</span>
    </div>
</template>

<script>

import io from 'socket.io-client'
export default {
    data() {
        return {
            mensagens: [],
            connected: false,
            socket: null,
            texto: '',
        }
    },
        // Quando iniciado o aplicativo
    created: function() {
        // Inicia a conexão com o websocket
        this.Conectar();
        this.LoadMessages()
    },
 
    // Métodos do aplicatvo
    methods: {
        LoadMessages() {
            this.$http.get("http://localhost:3000/mensagens").then((res) => {
                this.mensagens = res.data
            })
        },
        Conectar() {
            let vm = this
            vm.socket = io('http://localhost:3000', {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax : 5000,
                reconnectionAttempts: Infinity
            });
            // let notificacoes = document.querySelector("#notificacoes");
            // let situacao = document.querySelector("#situacao");
            
            vm.socket.on("connect", function() {
                console.log("Conectado") // eslint-disable-line no-console 
                vm.connected = true
            })
            
            vm.socket.on("mensagem", function(msg) {
                vm.mensagens.push(msg)
            })

            vm.socket.on("disconnect", function() {
                vm.connected = false
            })

        },

        sendMessage: function() {
            var self = this;
 
            if (!self.texto) {
                alert("Preencha o texto")
                return;
            }
  
            self.socket.emit("mensagem", JSON.stringify({
                token: localStorage.token,
                texto: self.texto,
            }));
 
            self.texto = null;
 
        },
 
    }
}
</script>

<style>
    #mensagens ul li {
        display: block;
        text-align: left;
    }
</style>