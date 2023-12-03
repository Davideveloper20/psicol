<template>
  <v-row justify="center">
    <v-dialog v-model="openDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Registro Docentes</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="name"
                  label="Nombre Completo*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="document"
                  label="Documento"
                  hint="Ejemplo: 1128270171"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="email"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="phone" label="Teléfono"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="address"
                  label="Dirección"
                  hint="Ejemplo: Calle 66A N5A 51 Medellín , Colombia"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="city"
                  label="Ciudad"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-autocomplete
                  v-model="courses"
                  :items="courseItems"
                  item-text="name"
                  item-value="id"
                  label="Cursos"
                  multiple
                ></v-autocomplete>
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

          <v-btn color="blue darken-1" text @click="saveTeacher">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      name: "",
      document: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      courses: [],
      courseItems: [],
      newCoursesSelected: [],
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit("cerrar");
    },

    openDialog() {
      this.dialog = true;
      this.$emit("click");
    },

    async saveTeacher() {
      const selectedIds = this.newCoursesSelected;
      const teachers = {
        name: this.name,
        document: this.document,
        email: this.email,
        phone: this.phone,
        address: this.address,
        city: this.city,
        selectedIds: JSON.stringify(selectedIds),
      };

      try {
        const response = await this.$axios.post("/api/teacher", teachers);

        console.log('Maestro creado', response);

        this.dialog = false;
        this.$emit("cerrar");
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    },
  },

  watch: {
    courses: function (newCourses) {
      this.newCoursesSelected = newCourses;
    },
  },

  mounted: function () {
    axios
      .get("http://localhost:8000/api/courses")
      .then((response) => {
        const res = response.data.courses;

        this.courseItems = res.map((course) => ({
          id: course.id,
          name: course.name,
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
