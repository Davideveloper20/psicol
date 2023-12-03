<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>Constancia de Matrícula</v-card-title>
        <v-card-text>
          <div><strong>Nombre:</strong> {{ studentInfo.name }}</div>
          <div><strong>Documento:</strong> {{ studentInfo.document }}</div>
          <div><strong>Email:</strong> {{ studentInfo.email }}</div>
          <div><strong>Teléfono:</strong> {{ studentInfo.phone }}</div>
          <div><strong>Dirección:</strong> {{ studentInfo.address }}</div>
          <div><strong>Ciudad:</strong> {{ studentInfo.city }}</div>
          <div><strong>Semestre:</strong> {{ studentInfo.semester }}</div>

          <v-row style="margin-top: 7px">
            <v-col cols="12" sm="6">
              <strong>Curso:</strong> {{ reportStudent[0] }}
            </v-col>
            <v-col cols="12" sm="4">
              <strong>Profesor:</strong> {{ reportStudent[1] }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <strong>Curso:</strong> {{ reportStudent[2] }}
            </v-col>
            <v-col cols="12" sm="4">
              <strong>Profesor:</strong> {{ reportStudent[3] }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" @click="$emit('close')">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      pares: [],
      impares: [],
      studentTotal: this.studentInfo.selectedIds,
      reportStudent: null,
    };
  },
  props: {
    studentInfo: Object,
  },

  mounted() {
    this.divideReport();
  },
  methods: {
    divideReport() {
      this.reportStudent = JSON.parse(this.studentTotal);
    },
  },
};
</script>
