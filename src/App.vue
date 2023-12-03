<template>
  <v-app>
    <v-img
      src="@/assets/img/index-image4.jpg"
      class="fill-height position-relative"
      gradient="to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)"
    >
      <v-container fill-height>
        <v-row justify="center" align="center" class="fill-height">
          <v-col cols="12" sm="8" md="6">
            <v-typography class="text-h4 font-weight-bold text-center">
              SISTEMA PARA LA GESTIÓN Y PROCESO DE MATRÍCULA UNIVERSIDAD PSICOL
            </v-typography>
          </v-col>
          <v-col cols="12" md="8" lg="6" xl="4">
            <v-btn color="primary" @click="openCoursesForm">Cursos</v-btn>
            <v-btn color="primary" @click="openTeacherForm">Docentes</v-btn>
            <v-btn color="primary" @click="openStudentsForm">Estudiantes</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-img>

    <CoursesForm v-if="coursesFormVisible" @cerrar="closeCoursesForm" />
    <TeacherForm v-if="teacherFormVisible" @cerrar="closeTeacherForm" />
    <StudentsForm v-if="studentsFormVisible" @cerrar="closeStudentsForm" />
  </v-app>
</template>

<script>
import StudentsForm from "@/components/forms/StudentsForm.vue";
import TeacherForm from "@/components/forms/TeacherForm.vue";
import CoursesForm from "@/components/forms/CoursesForm.vue";

export default {
  name: "App",
  components: {
    StudentsForm,
    TeacherForm,
    CoursesForm,
  },
  data() {
    return {
      studentsFormVisible: false,
      teacherFormVisible: false,
      coursesFormVisible: false,
    };
  },
  methods: {
    openStudentsForm() {
      this.studentsFormVisible = true;
    },
    closeStudentsForm() {
      this.studentsFormVisible = false;
    },
    openTeacherForm() {
      this.teacherFormVisible = true;
    },
    closeTeacherForm() {
      this.teacherFormVisible = false;
    },
    openCoursesForm() {
      this.coursesFormVisible = true;
    },
    closeCoursesForm() {
      this.coursesFormVisible = false;
    },
  },
};
</script>

<style>
.fill-height {
  height: 100%;
}

.position-relative {
  position: relative;
}

.text-h4 {
  font-size: 2.5rem;
  color: white;
}

.v-btn {
  margin-right: 20px;
}
</style>
