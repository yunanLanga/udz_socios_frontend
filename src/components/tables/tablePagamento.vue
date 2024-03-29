<template>
  <p v-show="msg">
    <v-alert type="success">{{ msg }}</v-alert>
  </p>

  <v-card title="Pagamentos de Qoutas" flat>
    <template v-slot:text
      ><v-text-field
        v-model="search"
        label="Pesquisa Aqui"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field
    ></template>

    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :items="serverItems"
      :search="search"
      :headers="headers"
      :items-length="totalItems"
      @update:options="loadItems"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="850px">
            <template v-slot:activator="{ props }">
              <v-btn class="mb-2" color="primary" dark v-bind="props">
                Adicionar Pagamento
              </v-btn>
            </template>
            <v-card>
              <v-card-title> </v-card-title>

              <v-card-text>
                <v-card-title>Adiconar Pagamento</v-card-title>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4" sm="6">
                      <v-select
                        v-model="editedItem.id_socio"
                        label="Seleciona o Socio"
                        :items="sociosItems"
                        item-value="id"
                        item-title="nome_completo"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        v-model="editedItem.data_pagamento"
                        label="Data de Pagamento"
                        type="date"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        v-model="editedItem.valor_contribuido"
                        label="Valor Quota contribuido"
                        :rules="[inputRules]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="success" variant="tonal" @click="save">
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Pretende apagar este socio do sistema?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="alert" variant="text" @click="deleteItemConfirm"
                  >Confirmar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-eye
        </v-icon>
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    msg: null,
    itemsPerPage: 5,
    headers: [
      { title: "#ID", key: "id", align: "center" },
      { title: "Nome Completo", key: "nome_socio", align: "center" },
      { title: "Data pagamento", key: "data_pagamento", align: "center" },
      { title: "Valor Pago", key: "valor_contribuido", align: "center" },
      { title: "Acções", key: "actions", align: "center" },
    ],
    serverItems: [],
    sociosItems: [],
    loading: true,
    totalItems: 0,
    search: "",
    editedIndex: -1,
    editedItem: {
      nome_socio: "",
      id_socio: "",
      valor_contribuido: "",
      data_pagamento: "2018-09-01",
    },
    inputRules: (v) =>
      (v && v.length >= 3) || "insira um numero superior a 100mts",
  }),
  mounted() {
    this.socios();
  },
  created() {
    this.loadItems();
  },
  computed: {
    formattedItems() {
      if (this.sociosItems && this.sociosItems.length > 0) {
        return this.sociosItems.map((item) => item.nome_completo);
      } else {
        return [];
      }
    },
  },
  methods: {
    loadItems() {
      // this.loading = true;
      axios
        .get("http://localhost:8000/api/qoutas")
        .then((response) => {
          this.serverItems = response.data.qoutas;
          this.totalItems = response.data.qoutas.length;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados", error);
          this.loading = false;
        });
    },

    // metodo para fechar o popup
    close() {
      this.dialog = false;

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      try {
        if (this.editedIndex > -1) {
          // Se editedIndex for maior que -1, significa que estamos editando um item existente
          await axios.put(
            `http://localhost:8000/api/qoutas/${this.editedItem.id}/edit`,
            this.editedItem
          );
          this.msg = "O pagamento foi actualizado com sucesso ";
          setTimeout(() => (this.msg = ""), 3000);
        } else {
          // Se editedIndex for -1, significa que estamos criando um novo item
          await axios.post("http://localhost:8000/api/qoutas", this.editedItem);
          this.msg = "O socio foi criado com sucesso ";
          setTimeout(() => (this.msg = ""), 3000);
        }
        // Após a operação de salvar bem-sucedida, feche o formulário de edição
        this.close();
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
    async editItem(item) {
      this.editedIndex = this.serverItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.alerta = true;
    },
    async deleteItem(item) {
      this.editedIndex = this.serverItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios.delete(
        `http://localhost:8000/api/qoutas/${this.editedItem.id}/delete`
      );
      this.closeDelete();
      this.msg = "O pagamento foi removido com sucesso ";
      setTimeout(() => (this.msg = ""), 3000);
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    socios() {
      // this.loading = true;
      axios
        .get("http://localhost:8000/api/socios")
        .then((response) => {
          this.sociosItems = response.data.socios;
          this.socios = false;
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados", error);
          this.loading = false;
        });
    },
  },
};
</script>
