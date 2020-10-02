<template>
    <div id="app" class="container">

        <div class="row">
            <div class="col s12">
                <p>Situação: {{connected ? 'Conectado' : "Desconectado"}}</p>
            </div>
        </div>
        
    

        <div class="row" v-if="connected">
            <div class="col s12">
                <p>Usuários conectados: {{usuarios}}</p>
            </div>
        </div>
    
    </div>
</template>

<script>

import io from 'socket.io-client'
export default {
    data() {
        return {
            usuarios: 0,
            connected: false,
            socket: null,
        }
    },
        // Quando iniciado o aplicativo
    created: function() {
        // Inicia a conexão com o websocket
        this.Conectar();
    },
 
    // Métodos do aplicatvo
    methods: {
        Conectar() {
            let vm = this
            vm.socket = io('http://localhost:8000', {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax : 5000,
                reconnectionAttempts: Infinity,
                query: { token: localStorage.token }
            });
            
            vm.socket.on("connect", function() {
                vm.connected = true
            })
            
            vm.socket.on("usuarios_conectados", function(msg) {
                vm.usuarios = msg
            })

            vm.socket.on("disconnect", function() {
                vm.connected = false
            })

        },
 
    }
}
</script>