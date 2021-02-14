<template>
    <div class="receipt">
        <v-dialog v-model="viewReceipt" width="600" timeout="3000">
            <v-card>
                <v-card-text class="black--text" id="receipt">
                    <h2 class="text-center">
                        <span class="receipt-title text-uppercase text-center black white--text font-weight-regular px-2">Receipt for fees</span>
                    </h2>
                    <h1 class="text-capitalize pt-2 text-center">
                        <span>Jorhat Institute Of Science & Technology</span><br>
                    </h1>
                    <h3 class="text-center text-capitalize font-weight-medium pt-1">
                        <span class="font-italic mt-1">(Formerly Science College, Jorhat)</span><br>
                        <span class="mt-1">P.O. Chenijan, Sotai, </span>
                        <span class="mt-1">Jorhat - 785010 (Assam)</span>
                    </h3>
                    <v-row class="pl-5 mt-2" justify="center" no-gutters>
                        <v-col cols="6" sm="6" md="6">
                            <h3>
                                <span class="text-capitalize">Name: <span class="text-capitalize font-weight-regular thin_text">{{studentDetails.student}}</span></span>
                            </h3>
                        </v-col>
                        <v-col cols="6" sm="6" md="6">
                            <h3>
                                <span class="text-capitalize">Roll Number: <span class="text-capitalize font-weight-regular thin_text">{{studentDetails.roll_number}}</span></span>
                            </h3>
                        </v-col>
                    </v-row>
                    <v-row class="pl-5" no-gutters>
                        <v-col cols="6" sm="6" md="6">
                            <h3>
                                <span class="text-capitalize">Year: <span class="text-capitalize font-weight-regular thin_text">{{get_depertment_details.dept_short}} {{hostelFee.semester}}</span></span>
                            </h3>
                        </v-col>
                        <v-col cols="6" sm="6" md="6">
                            <h3>
                                <span class="text-capitalize">Date: <span class="text-capitalize font-weight-regular thin_text">{{formatDate(hostelFee.admission_date)}}</span></span>
                            </h3>
                        </v-col>
                    </v-row>
                    <v-divider class="mt-2"></v-divider>
                    <v-row class="pl-5" align="center" justify="center" no-gutters>
                        <v-col cols="2" sm="2" md="2">
                            <h3 class="text-center">
                                <span class="text-capitalize subtitle-2">Sl. No.</span>
                            </h3>
                        </v-col>
                        <v-col cols="7" sm="7" md="7">
                            <h3 class="text-center" >
                                <span class="text-uppercase subtitle-2">Particulars</span>
                            </h3>
                        </v-col>
                        <v-col cols="3" sm="3" md="3">
                            <h3 class="text-center">
                                <span class="text-capitalize subtitle-2">Amount</span>
                            </h3>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row class="pl-5" align="center" justify="center" no-gutters v-for="data in receiptData" :key="data.sl_no">
                        <v-col cols="2" sm="2" md="2" class="text-center">
                            <span class="text-capitalize">{{data.sl_no}}</span>
                        </v-col>
                        <v-col cols="7" sm="7" md="7" class="text-center">
                            <span class="text-capitalize">{{data.particular}}</span>
                        </v-col>
                        <v-col cols="3" sm="3" md="3" class="text-center">
                            <span>{{data.amount}}</span>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row class="pl-5" align="center" justify="center" no-gutters>
                        <v-col cols="2" sm="2" md="2">
                            <h3 class="text-center">
                                <span class="text-capitalize subtitle-2"></span>
                            </h3>
                        </v-col>
                        <v-col cols="7" sm="7" md="7" class="text-center">
                            <h3 class="text-center" >
                                <span class="text-capitalize subtitle-2">total</span>
                            </h3>
                        </v-col>
                        <v-col cols="3" sm="3" md="3" class="text-center">
                            <span class="">{{hostelFee.total ? (hostelFee.total).toFixed(2) : ''}}</span>
                        </v-col>
                    </v-row>
                    <br><br><br>
                    <v-row class="note_signature" align="center">
                        <v-col cols="7" sm="7" md="7" class="caption">
                            <span class="">N.B.: This receipt must be produce at the time of next payment.</span>
                            <span> No payment should be made without receipt.</span>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="3" sm="3" md="3">
                            <span class="text-capitalize font-weight-medium">Collector's Signature</span>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn color="primary" text @click="printReceipt('receipt')">Print</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="$emit('hide-receipt')">Close</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    props: [
        'viewReceipt',
        'studentDetails',
        'hostelFee',
        'receiptData'
    ],
    data: () => ({
        depertment_short: '',
        semester: '',
        admission_date: '',
        receipt_data: [],
        admitted_student_data: {},
    }),
    computed: {
        ...mapGetters([
            'get_depertment_details'
        ])
    },
    watch: {
        studentDetails() {
            this.fetch_depertment_details(this.studentDetails.depertment_id)
        }
    },
    methods: {
        ...mapActions([
            'fetch_depertment_details'
        ]),
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        printReceipt(divName){
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
            this.isPageLoad = false
        }
    },
}
</script>
