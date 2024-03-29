<template>
  <p v-show="msg">
    <v-alert type="success">{{ msg }}</v-alert>
  </p>

  <v-card title="Registo de Socios" flat>
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
      :headers="headers"
      :items="serverItems"
      :search="search"
      :items-length="totalItems"
      item-value="name"
      @update:options="loadItems"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="850px">
            <template v-slot:activator="{ props }">
              <v-btn class="mb-2" color="primary" dark v-bind="props">
                Adicionar Sócio
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-card-title>Cadastrar Sócio</v-card-title>
                <v-container>
                  <v-form ref="form">
                    <v-row>
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.nome_completo"
                          label="Nome Completo"
                          :rules="[
                            required('Nome Completo'),
                            minLength('Nome Completo', 3),
                          ]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.data_nasciemnto"
                          label="Data de Nascimento"
                          type="date"
                          :rules="[required('Data de Nascimento')]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.nacionalidade"
                          label="Nacionalidade"
                          :rules="[
                            required('Nacionalidade'),
                            minLength('Nacionalidade', 3),
                          ]"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="4" sm="6">
                        <v-select
                          v-model="editedItem.genero"
                          label="genero"
                          :items="['Masculino', 'Femenino']"
                          :rules="[required('genero'), minLength('genero', 8)]"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.endereco"
                          label="Endereço"
                          :rules="[
                            required('Endereço'),
                            minLength('Endereço', 2),
                          ]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.telefone"
                          label="Telefone"
                          :rules="[
                            required('Telefone'),
                            minLength('Telefone', 8),
                          ]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.telefone_opcional"
                          label="Telefone Opcional"
                          :rules="[
                            required('Telefone'),
                            minLength('Telefone', 8),
                          ]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.email"
                          label="email"
                          :rules="[required('email'), minLength('email', 8)]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        <v-select
                          v-model="editedItem.tipo_documento_de_identificacao"
                          label="Tipo Documento de Identificação"
                          :items="['BI', 'Passa-Port', 'Cedula Pessoal']"
                          :rules="[required('Tipo Documento de Identificação')]"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.documento_de_identificacao"
                          label="Documento de Identificação"
                          :rules="[required('Documento de Identificação')]"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="4" sm="6">
                        <v-select
                          v-model="editedItem.categoria_socio"
                          label="categoria"
                          :items="[
                            'Sócio Fundador',
                            'Sócio Efetivo Ouro',
                            'Sócio Efetivo Prata',
                            'Sócio Efetivo Broze',
                            'Sócio Coorporativo Ouro',
                            'Sócio Coorporativo Prata',
                            'Sócio Coorporativo Broze',
                            'Sócio Juvenil',
                            'Sócio Honorário',
                          ]"
                          :rules="[required('categoria')]"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.valor_quota_contribuido"
                          label="Valor da contribuido"
                          :rules="[required('Valor da contribuido')]"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="4" sm="6">
                        <v-text-field
                          v-model="editedItem.valor_quota_anual"
                          label="Qouta Anual"
                          :rules="[required('Qouta Anual')]"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="4" sm="6">
                        <v-select
                          v-model="editedItem.estado_socio"
                          label="Estado"
                          :items="['Activo', 'Inactivo']"
                          :rules="[required('Estado')]"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-form>
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
      { title: "ID", key: "id", align: "center" },
      { title: "Nome Completo", key: "nome_completo", align: "center" },
      { title: "Telefone", key: "telefone", align: "center" },
      { title: "Email", key: "email", align: "center" },
      { title: "Categoria", key: "categoria_socio", align: "center" },
      { title: "Estado", key: "estado_socio", align: "center" },
      { title: "Acções", key: "actions", align: "center" },
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
    search: "",
    editedIndex: -1,
    editedItem: {
      nome_completo: "",
      endereco: "",
      nacionalidade: "",
      genero: "",
      tipo_documento_de_identificacao: "",
      documento_de_identificacao: "",
      telefone: 0,
      telefone_opcional: 0,
      categoria_socio: "",
      email: "",
      valor_quota_anual: "",
      estado_socio: "",
      valor_quota_contribuido: "",
      data_nasciemnto: "2018-09-01",
    },
    required(propertyType) {
      return (v) =>
        (v && v.length > 0) || `Campo ${propertyType} é obrigatorio!`;
    },
    minLength(propertyType, minLength) {
      return (v) =>
        (v && v.length >= minLength) ||
        `Campo ${propertyType} tem de ter no minino ${minLength} carácter`;
    },
  }),
  created() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      // this.loading = true;
      axios
        .get("http://localhost:8000/api/socios")
        .then((response) => {
          this.serverItems = response.data.socios;
          this.totalItems = response.data.socios.length;
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
            `http://localhost:8000/api/socios/${this.editedItem.id}/edit`,
            this.editedItem
          );
          this.msg = "O socio foi actualizado com sucesso ";
          setTimeout(() => (this.msg = ""), 3000);
        } else {
          // Se editedIndex for -1, significa que estamos criando um novo item
          this.$refs.form.validate();
          await axios.post("http://localhost:8000/api/socios", this.editedItem);
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
        `http://localhost:8000/api/socios/${this.editedItem.id}/delete`
      );
      this.closeDelete();
      this.msg = "O socio foi removido com sucesso ";
      setTimeout(() => (this.msg = ""), 3000);
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
