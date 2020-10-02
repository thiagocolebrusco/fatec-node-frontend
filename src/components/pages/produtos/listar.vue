<template>
    <b-container>
        <b-row>
            <b-col>
                <h1>Produtos</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-table striped :items="items" :fields="fields">
                    <template v-slot:cell(imagem)="data">
                        <img :src="'http://localhost:8000/uploads/' + data.value" width="100" />
                    </template>
                </b-table>
            </b-col>
        </b-row>

    </b-container>

</template>

<script lang="text/javascript">
export default {
    data() {
        return{
            fields: ['nome', 'preco', 'imagem'],
            items: []
        }
    },
    created() {
        this.LoadData();
    },
    methods: {
        LoadData() {
            this.$http.get("produtos")
                .then((response) => {
                    this.items = response.data
                })
        }
    }
}
</script>
