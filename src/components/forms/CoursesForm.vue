<template>
  <v-row justify="center">
    <v-dialog v-model="openDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Registro Cursos</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="name"
                  label="Nombre*"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="description"
                  label="Descripción"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field v-model="credits" label="Créditos"></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field v-model="course" label="Área"></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field v-model="status" label="Status"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*campo obligatorio</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog"
            >Cancelar</v-btn
          >

          <v-btn color="blue darken-1" text @click="saveCourse">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      name: "",
      description: "",
      credits: "",
      course: "",
      status: "",
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit("cerrar");
    },

    async saveCourse() {
      const courses = {
        name: this.name,
        description: this.description,
        credits: this.credits,
        course: this.course,
        status: this.status,
      };

      try {
        const response = await this.$axios.post("/api/courses", courses);

        console.log('Curso creado', response);


        this.dialog = false;
        this.$emit("cerrar");
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    },

    openDialog() {
      this.dialog = true;
      this.$emit("click");
    },
  },
};
</script>
