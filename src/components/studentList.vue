<template>
    <v-card>
        <v-card-text class="black--text" id="student-list">
            <h2 class="text-center">
                <span class="student-list-title text-uppercase text-center black white--text font-weight-regular px-2">Student List</span>
            </h2>
            <h1 class="text-capitalize pt-2 text-center">
                <span>Jorhat Institute Of Science & Technology</span><br>
            </h1>
            <h3 class="text-center text-capitalize font-weight-medium pt-1">
                <span class="font-italic mt-1">(Formerly Science College, Jorhat)</span><br>
                <span class="mt-1">P.O. Chenijan, Sotai, </span>
                <span class="mt-1">Jorhat - 785010 (Assam)</span>
            </h3>
            <v-row justify="left" no-gutters>
                <v-col cols="5" sm="5" md="5">
                    <h3>
                    <span class="text-capitalize">Department: <span class="text-capitalize font-weight-regular thin_text">{{depertment}}</span></span>
                    </h3>
                </v-col>
                <v-col cols="5" sm="5" md="5">
                    <h3>
                    <span class="text-capitalize">Branch: <span class="text-capitalize font-weight-regular thin_text">{{branch}}</span></span>
                    </h3>
                </v-col>
                <v-col cols="2" sm="2" md="2">
                    <h3>
                    <span class="text-capitalize">Semester: <span class="text-capitalize font-weight-regular thin_text">{{semester}}</span></span>
                    </h3>
                </v-col>
            </v-row>
            <v-divider class="mt-2"></v-divider>
            <v-row class="pl-5" align="center" justify="center" no-gutters>
                <v-col cols="1" sm="1" md="1">
                    <h3 class="text-center">
                    <span class="text-capitalize subtitle-2">Sl. No.</span>
                    </h3>
                </v-col>
                <v-col cols="4" sm="4" md="4">
                    <h3 class="text-center">
                    <span class="text-capitalize subtitle-2">Roll Number</span>
                    </h3>
                </v-col>
                <v-col cols="3" sm="3" md="3">
                    <h3 class="text-center" >
                    <span class="text-capitalize subtitle-2">First Name</span>
                    </h3>
                </v-col>
                <v-col cols="3" sm="3" md="3">
                    <h3 class="text-center" >
                    <span class="text-capitalize subtitle-2">Last Name</span>
                    </h3>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="pl-5" align="center" justify="center" no-gutters v-for="data in studentData" :key="data.serial_number">
                <v-col cols="1" sm="1" md="1" class="text-center">
                    <span class="text-capitalize">{{data.serial_number}}</span>
                </v-col>
                <v-col cols="4" sm="4" md="4" class="text-center">
                    <span class="text-capitalize">{{data.roll_number}}</span>
                </v-col>
                <v-col cols="3" sm="3" md="3" class="text-center">
                    <span class="text-capitalize">{{data.first_name}}</span>
                </v-col>
                <v-col cols="3" sm="3" md="3" class="text-center">
                    <span class="text-capitalize">{{data.last_name}}</span>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="primary" text @click="printList('student-list')">Print</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="$emit('close-list')">Close</v-btn>
          </v-card-actions>
        </v-card-text>
    </v-card>    
</template>

<script>
export default {
    props: [
        'admitted_student_data',
        'depertment',
        'branch',
        'semester'
    ],
    data() {
        return {
            
        }
    },
    computed: {
        studentData () {
            let data =  this.sortByRollNumber(this.admitted_student_data)
            for(let i = 0; i < data.length; i++) {
                data[i].serial_number = i + 1
            }
            return data
        }
    },
    methods: {
        printList(divName){
            let w=window.open();
            var printContents = "<html>"
            printContents += document.getElementById(divName).innerHTML
            printContents += "</html>"
            w.document.write('<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />')
            w.document.write('<link rel="stylesheet" href="css/recipt.css" type="text/css" />')
            w.document.write(printContents)
            w.document.close()
            w.focus()
            w.print()
        },
        sortByRollNumber (studentData) {
            studentData.sort(this.sort_by('roll_number', false, (a) =>  a.toUpperCase()))
            return studentData
        },
        sort_by (field, reverse, primer) {

            const key = primer ?
                function(x) {
                return primer(x[field])
                } :
                function(x) {
                return x[field]
                };

            reverse = !reverse ? 1 : -1;

            return function(a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        }
    }
}
</script>
