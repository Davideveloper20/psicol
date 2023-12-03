<template>
  <v-row justify="center">
    <v-dialog v-model="openDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Registro Estudiantes</span>
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
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="document"
                  label="Documento"
                  hint="Ejemplo: 1128270171"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="email"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field v-model="phone" label="Teléfono"></v-text-field>
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="semester"
                  label="Semestre"
                  required
                ></v-text-field>
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
                <v-select
                  v-model="courses"
                  :items="courseItems"
                  item-text="name"
                  item-value="id"
                  label="Cursos"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="teachers"
                  :items="teacherItems"
                  item-text="name"
                  item-value="id"
                  label="Docente"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6" v-for="index in selectCount" :key="index">
                <v-select
                  v-if="showNewSelect"
                  v-model="newCoursesSelected[index]"
                  :items="courseItems"
                  item-text="name"
                  item-value="id"
                  :label="`Nuevo Curso ${index + 1}`"
                  @change="getTeachersByCourseNew()"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6" v-for="index in selectCount" :key="index">
                <v-select
                  v-if="showNewSelect"
                  v-model="newTeachersSelected[index]"
                  :items="teacherItemsNew"
                  item-text="name"
                  item-value="id"
                  :label="`Nuevo Docente ${index + 1}`"
                  @change="setTeacherNew()"
                ></v-select>
              </v-col>

              <v-btn ref="addButton" color="blue darken-1" @click="addCourse"
                >Agregar</v-btn
              >
            </v-row>
          </v-container>
          <small>*campo obligatorio</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog"
            >Cancelar</v-btn
          >

          <v-btn color="blue darken-1" text @click="saveStudent">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <courses-student-report
      v-if="showReport"
      :studentInfo="studentInfo"
      @close="showReport = false"
    ></courses-student-report>
  </v-row>
</template>

<script>
import axios from "axios";

import CoursesStudentReport from "@/components/reports/CoursesStudentReport.vue";

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
      semester: [],
      courses: [],
      courseItems: [],
      newCoursesSelected: [],
      teacherItemsNew: [],
      selectCount: 0,
      newTeachersSelected: [],
      teachers: [],
      teacherItems: [],
      showNewSelect: false,
      courseTeacherOne: [],
      courseTeacherTwo: [],
      showReport: false,
      studentInfo: null,
      courseFinal: "",
      coursesAll: [],
      creditsOne: 0,
      creditsTwo: 0,
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
    async saveStudent() {
      const resultado = parseInt(this.creditsOne) + parseInt(this.creditsTwo);


      if (resultado < 7) {
        alert(
          `No puede tener menos de 7 créditos, agregue más cursos: ${resultado}`
        );
      } else {
        const courseOne = this.courseTeacherOne;

        const students = {
          name: this.name,
          document: this.document,
          email: this.email,
          phone: this.phone,
          address: this.address,
          city: this.city,
          semester: this.semester,
          selectedIds: JSON.stringify(courseOne),
        };

        try {
          const response = await this.$axios.post("/api/student", students);
          this.studentInfo = response.data.student;
          this.showReport = true;

          this.dialog = false;
          this.$emit("click");
        } catch (error) {
          console.error("Error al enviar los datos:", error);
        }
      }
    },

    async fetchTeachersByCourseId(courseId) {
      const selectedCourseOne = this.courseItems.find(
        (course) => course.id === courseId
      );

      const selectedCourseName = selectedCourseOne
        ? selectedCourseOne.name
        : null;

      this.courseFinal = selectedCourseName;


      axios
        .get("http://localhost:8000/api/teacher")
        .then((response) => {

          const res = response.data.teachers;

          this.selectedItems = res.filter((item) => {
            const selectedIds = item.selectedIds;
            return selectedIds.includes(courseId);
          });          

          this.teacherItems = this.selectedItems.map((course) => ({
            id: course.id,
            name: course.name,
          }));
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async getTeachersByCourseNew() {
      const selectedCourseOne = this.courseItems.find(
        (course) => course.id === this.newCoursesSelected[1]
      );

      const selectedCourseName = selectedCourseOne
        ? selectedCourseOne.name
        : null;

      this.courseTeacherOne.push(selectedCourseName);

      const cursoEncontrado = this.coursesAll.find(
        (curso) => curso.name === selectedCourseName
      );

      if (cursoEncontrado) {
        const creditos = cursoEncontrado.credits;
        this.creditsTwo = parseInt(creditos);
      } else {
        console.log(
          `No se encontró el curso con el nombre ${selectedCourseName}`
        );
      }

      axios
        .get("http://localhost:8000/api/teacher")
        .then((response) => {

          const res = response.data.teachers;

          this.selectedItems = res.filter((item) => {
            const selectedIds = item.selectedIds;
            return selectedIds.includes(this.newCoursesSelected[1]);
          });

          this.teacherItemsNew = this.selectedItems.map((course) => ({
            id: course.id,
            name: course.name,
          }));
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async setTeacherNew() {
      const selectedCourseOne = this.teacherItems.find(
        (course) => course.id === this.newTeachersSelected[1]
      );

      const selectedCourseName = selectedCourseOne
        ? selectedCourseOne.name
        : null;

      this.courseTeacherOne.push(selectedCourseName);
    },

    addCourse() {
      this.showNewSelect = true;
      this.selectCount += 1;
      this.newCoursesSelected.push("");
      this.newTeachersSelected.push("");
    },
  },

  watch: {
    courses: function (newCourses) {
      this.fetchTeachersByCourseId(newCourses);
    },

    teachers: function (newTeachers) {
      const selectedCourseOne = this.teacherItems.find(
        (teacher) => teacher.id === newTeachers
      );

      const selectedCourseName = selectedCourseOne
        ? selectedCourseOne.name
        : null;

      this.courseTeacherOne.push(this.courseFinal);

      this.courseTeacherOne.push(selectedCourseName);

      const cursoEncontrado = this.coursesAll.find(
        (curso) => curso.name === this.courseFinal
      );

      if (cursoEncontrado) {
        const creditos = cursoEncontrado.credits;
        this.creditsOne = parseInt(creditos);

      } else {
        console.log(
          `No se encontró el curso con el nombre ${this.courseFinal}`
        );
      }
      
    },
  },

  mounted: function () {
    axios
      .get("http://localhost:8000/api/courses")
      .then((response) => {
        const res = response.data.courses;
        this.coursesAll = response.data.courses;

        this.courseItems = res.map((course) => ({
          id: course.id,
          name: course.name,
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  },

  components: {
    CoursesStudentReport,
  },
};
</script>
