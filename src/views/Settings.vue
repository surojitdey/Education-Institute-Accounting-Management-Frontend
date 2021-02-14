<template>
  <div class="settings">
    <!-- <span>{{fee_data}}</span> -->
    <v-card fluid>
      <v-card-title class="text-uppercase">
        <span class="text-center">
          Admission Fee Setting
        </span>
      </v-card-title>
    </v-card>

    <v-tabs
    v-model="tab"
    background-color="white"
    class="elevation-2"
    :grow="true"
    center-active
    show-arrows
    next-icon="navigate_next"
    prev-icon="navigate_before"
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#bsc">Bachelor of Science</v-tab>
      <v-tab href="#it">Bachelor of Science in Information Technology</v-tab>
      <v-tab href="#be">Bachelor of Engineering</v-tab>
      <v-tab href="#msc">Master of Science</v-tab>
      <v-tab href="#chem">Master of Science in Chemistry</v-tab>
      <v-tab href="#phd">PhD</v-tab>
      <v-tab-item value="bsc">
        <v-card flat>
          <v-tabs v-model="semester_tab" light class="elevation-10" centered center-active>
            <v-tabs-slider v-show="false"></v-tabs-slider>
            <v-tab href="#odd" class="semester_border">odd semester</v-tab>
            <v-tab href="#even" class="semester_border">even semester</v-tab>
            <v-tab-item value="odd">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Govt. Dues" v-model="bsc_odd_govt_dues" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Tuition Fee" v-model="bsc_odd_tuition_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Identity Card" v-model="bsc_odd_identity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Examination Fee" v-model="bsc_odd_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Student Union Fee" v-model="bsc_odd_student_union_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Gamse and Sports" v-model="bsc_odd_game_sports_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Magazine Fee" v-model="bsc_odd_magazine_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Laboratory Fee" v-model="bsc_odd_laboratory_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="University Registration Fee" v-model="bsc_odd_university_registration_fee" outlined dense :rules= "[rules.number]" :prepend-inner-icon="rupee_icon"></v-text-field>
                        <v-text-field label="Enrolment Fee" v-model="bsc_odd_enrolment_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Electricity" v-model="bsc_odd_electricity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Group Insurance" v-model="bsc_odd_group_insurance_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Scout & Guide" v-model="bsc_odd_scout_guide_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Intenet Service" v-model="bsc_odd_internet_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Student Welfare Fund" v-model="bsc_odd_welfare_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="College Development" v-model="bsc_odd_development_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Library & Lab. Caution Money" v-model="bsc_odd_library_caution_fee" outlined dense :rules= "[rules.number]" :prepend-inner-icon="rupee_icon"></v-text-field>
                        <v-text-field label="Transport Fee" v-model="bsc_odd_transport_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Training & Placement" v-model="bsc_odd_training_placement_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="College Festival" v-model="bsc_odd_college_festival_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-text-field label="Medical Fee" v-model="bsc_odd_medical_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Late Fine" v-model="bsc_odd_late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                        <v-menu
                          v-model="menu_bsc_odd"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <!-- <v-text-field
                              v-model="bsc_odd_last_date"
                              label="Last Date of Admisson"
                              append-icon="event"
                              @blur="bsc_odd_date = parseDate(bsc_odd_last_date)"
                              v-on="on"
                              outlined
                            ></v-text-field> -->
                            <v-text-field
                              v-model="bsc_odd_last_date"
                              label="Last Date of Admisson"
                              append-icon="event"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="bsc_odd_date" @input="menu_bsc_odd = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
                  <div class="flex-grow-0"></div>
                  <v-btn type="submit" color="success darken-1" width="115" @click="bsc_fee_update">Save</v-btn>

                  <v-btn color="error darken-1" width="115" @click="bsc_odd_reset">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item value="even">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Govt. Dues" v-model="bsc_even_govt_dues" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Tuition Fee" v-model="bsc_even_tuition_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Examination Fee" v-model="bsc_even_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Laboratory Fee" v-model="bsc_even_laboratory_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Enrolment Fee" v-model="bsc_even_enrolment_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Intenet Service" v-model="bsc_even_internet_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Development" v-model="bsc_even_development_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Transport Fee" v-model="bsc_even_transport_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Medical Fee" v-model="bsc_even_medical_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Late Fine" v-model="bsc_even_late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-menu
                          v-model="menu_bsc_even"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="bsc_even_last_date"
                              label="Last Date of Admisson"
                              append-icon="event"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="bsc_even_date" @input="menu_bsc_even = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
                  <div class="flex-grow-0"></div>
                  <v-btn type="submit" color="success darken-1" width="115" @click="bsc_even_fee_update">Save</v-btn>

                  <v-btn color="error darken-1" width="115" @click="bsc_even_reset">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-tab-item>

      <v-tab-item value="it">
        <v-card flat>
          <v-tabs v-model="semester_tab" light class="elevation-10" centered center-active>
            <v-tabs-slider v-show="false"></v-tabs-slider>
            <v-tab href="#odd" class="semester_border">odd semester</v-tab>
            <v-tab href="#even" class="semester_border">even semester</v-tab>
            <v-tab-item value="odd">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Govt. Dues" v-model="it_odd_govt_dues" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Tuition Fee" v-model="it_odd_tuition_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Identity Card" v-model="it_odd_identity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Examination Fee" v-model="it_odd_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Student Union Fee" v-model="it_odd_student_union_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Gamse and Sports" v-model="it_odd_game_sports_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Magazine Fee" v-model="it_odd_magazine_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Laboratory Fee" v-model="it_odd_laboratory_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="University Registration Fee" v-model="it_odd_university_registration_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Enrolment Fee" v-model="it_odd_enrolment_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Electricity" v-model="it_odd_electricity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Group Insurance" v-model="it_odd_group_insurance_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Scout & Guide" v-model="it_odd_scout_guide_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Intenet Service" v-model="it_odd_internet_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Student Welfare Fund" v-model="it_odd_welfare_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Development" v-model="it_odd_development_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Library & Lab. Caution Money" v-model="it_odd_library_caution_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Transport Fee" v-model="it_odd_transport_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Training & Placement" v-model="it_odd_training_placement_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Festival" v-model="it_odd_college_festival_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Medical Fee" v-model="it_odd_medical_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Late Fine" v-model="it_odd_late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-menu
                          v-model="menu_it_odd"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="it_odd_last_date"
                              label="Last Date of Admisson"
                              append-icon="event"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="it_odd_date" @input="menu_it_odd = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
                  <div class="flex-grow-0"></div>
                  <v-btn type="submit" color="success darken-1" width="115" @click="it_fee_update">Save</v-btn>
                  <v-btn color="error darken-1" width="115" @click="it_odd_reset">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>

            <v-tab-item value="even">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Govt. Dues" v-model="it_even_govt_dues" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Tuition Fee" v-model="it_even_tuition_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Examination Fee" v-model="it_even_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Laboratory Fee" v-model="it_even_laboratory_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Enrolment Fee" v-model="it_even_enrolment_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Intenet Service" v-model="it_even_internet_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Development" v-model="it_even_development_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Transport Fee" v-model="it_even_transport_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Medical Fee" v-model="it_even_medical_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Late Fine" v-model="it_even_late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-menu
                          v-model="menu_it_even"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="it_even_last_date"
                              label="Last Date of Admisson"
                              append-icon="event"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="it_even_date" @input="menu_it_even = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
                  <div class="flex-grow-0"></div>
                  <v-btn type="submit" color="success darken-1" width="115" @click="it_even_fee_update">Save</v-btn>

                  <v-btn color="error darken-1" width="115" @click="it_even_reset">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-tab-item>


      <v-tab-item value="be">
        <v-card flat>
          <v-tabs v-model="semester_tab" light class="elevation-10" centered center-active>
            <v-tabs-slider v-show="false"></v-tabs-slider>
            <v-tab href="#odd" class="semester_border">odd semester</v-tab>
            <v-tab href="#even" class="semester_border">even semester</v-tab>
            <v-tab-item value="odd">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Govt. Dues" v-model="be_odd_govt_dues" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Identity Card" v-model="be_odd_identity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Examination Fee" v-model="be_odd_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Student Union Fee" v-model="be_odd_student_union_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Gamse and Sports" v-model="be_odd_game_sports_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Magazine Fee" v-model="be_odd_magazine_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Laboratory Fee" v-model="be_odd_laboratory_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="University Registration Fee" v-model="be_odd_university_registration_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Enrolment Fee" v-model="be_odd_enrolment_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Electricity" v-model="be_odd_electricity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Group Insurance" v-model="be_odd_group_insurance_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Scout & Guide" v-model="be_odd_scout_guide_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Intenet Service" v-model="be_odd_internet_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Student Welfare Fund" v-model="be_odd_welfare_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Development" v-model="be_odd_development_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Library & Lab. Caution Money" v-model="be_odd_library_caution_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Transport Fee" v-model="be_odd_transport_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="ISTE" v-model="be_odd_iste_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Training & Placement" v-model="be_odd_training_placement_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Festival" v-model="be_odd_college_festival_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Medical Fee" v-model="be_odd_medical_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Late Fine" v-model="be_odd_late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-menu
                          v-model="menu_be_odd"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="be_odd_last_date"
                              label="Last Date of Admisson"
                              append-icon="event"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="be_odd_date" @input="menu_be_odd = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
                  <div class="flex-grow-0"></div>
                  <v-btn type="submit" color="success darken-1" width="115" @click="be_fee_update">Save</v-btn>
                  <v-btn color="error darken-1" width="115" @click="be_odd_reset">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item value="even">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Govt. Dues" v-model="be_even_govt_dues" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Examination Fee" v-model="be_even_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Laboratory Fee" v-model="be_even_laboratory_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Enrolment Fee" v-model="be_even_enrolment_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Intenet Service" v-model="be_even_internet_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Development" v-model="be_even_development_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Transport Fee" v-model="be_even_transport_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Medical Fee" v-model="be_even_medical_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Late Fine" v-model="be_even_late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-menu
                          v-model="menu_be_even"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="be_even_last_date"
                              label="Last Date of Admisson"
                              append-icon="event"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="be_even_date" @input="menu_be_even = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
                  <div class="flex-grow-0"></div>
                  <v-btn type="submit" color="success darken-1" width="115" @click="be_even_fee_update">Save</v-btn>
                  <v-btn color="error darken-1" width="115" @click="be_even_reset">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-tab-item>


      <v-tab-item value="msc">
        <v-card flat>
          <v-tabs v-model="semester_tab" light class="elevation-10" centered center-active>
            <v-tabs-slider v-show="false"></v-tabs-slider>
            <v-tab href="#odd" class="semester_border">odd semester</v-tab>
            <v-tab href="#even" class="semester_border">even semester</v-tab>
            <v-tab-item value="odd">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Govt. Dues" v-model="msc_odd_govt_dues" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Tuition Fee" v-model="msc_odd_tuition_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Identity Card" v-model="msc_odd_identity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Examination Fee" v-model="msc_odd_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Student Union Fee" v-model="msc_odd_student_union_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Gamse and Sports" v-model="msc_odd_game_sports_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Magazine Fee" v-model="msc_odd_magazine_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Laboratory Fee" v-model="msc_odd_laboratory_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="University Registration Fee" v-model="msc_odd_university_registration_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Enrolment Fee" v-model="msc_odd_enrolment_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Electricity" v-model="msc_odd_electricity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Group Insurance" v-model="msc_odd_group_insurance_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Scout & Guide" v-model="msc_odd_scout_guide_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Intenet Service" v-model="msc_odd_internet_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Student Welfare Fund" v-model="msc_odd_welfare_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Development" v-model="msc_odd_development_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Library & Lab. Caution Money" v-model="msc_odd_library_caution_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Transport Fee" v-model="msc_odd_transport_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Training & Placement" v-model="msc_odd_training_placement_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Festival" v-model="msc_odd_college_festival_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Medical Fee" v-model="msc_odd_medical_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Late Fine" v-model="msc_odd_late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-menu
                          v-model="menu_msc_odd"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="msc_odd_last_date"
                              label="Last Date of Admisson"
                              append-icon="event"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="msc_odd_date" @input="menu_msc_odd = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
                  <div class="flex-grow-0"></div>
                  <v-btn type="submit" color="success darken-1" width="115" @click="msc_fee_update">Save</v-btn>
                  <v-btn color="error darken-1" width="115" @click="msc_odd_reset">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item value="even">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Govt. Dues" v-model="msc_even_govt_dues" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Tuition Fee" v-model="msc_even_tuition_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Examination Fee" v-model="msc_even_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Laboratory Fee" v-model="msc_even_laboratory_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Enrolment Fee" v-model="msc_even_enrolment_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Intenet Service" v-model="msc_even_internet_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Development" v-model="msc_even_development_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Transport Fee" v-model="msc_even_transport_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Festival" v-model="msc_even_college_festival_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Medical Fee" v-model="msc_even_medical_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Late Fine" v-model="msc_even_late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-menu
                          v-model="menu_msc_even"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="msc_even_last_date"
                              label="Last Date of Admisson"
                              append-icon="event"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="msc_even_date" @input="menu_msc_even = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
                  <div class="flex-grow-0"></div>
                  <v-btn type="submit" color="success darken-1" width="115" @click="msc_even_fee_update">Save</v-btn>

                  <v-btn color="error darken-1" width="115" @click="msc_even_reset">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-tab-item>


      <v-tab-item value="chem">
        <v-card flat>
          <v-tabs v-model="semester_tab" light class="elevation-10" centered center-active>
            <v-tabs-slider v-show="false"></v-tabs-slider>
            <v-tab href="#odd" class="semester_border">odd semester</v-tab>
            <v-tab href="#even" class="semester_border">even semester</v-tab>
            <v-tab-item value="odd">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Govt. Dues" v-model="chem_odd_govt_dues" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Tuition Fee" v-model="chem_odd_tuition_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Identity Card" v-model="chem_odd_identity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Examination Fee" v-model="chem_odd_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Student Union Fee" v-model="chem_odd_student_union_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Gamse and Sports" v-model="chem_odd_game_sports_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Magazine Fee" v-model="chem_odd_magazine_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Laboratory Fee" v-model="chem_odd_laboratory_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="University Registration Fee" v-model="chem_odd_university_registration_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Enrolment Fee" v-model="chem_odd_enrolment_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Electricity" v-model="chem_odd_electricity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Group Insurance" v-model="chem_odd_group_insurance_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Scout & Guide" v-model="chem_odd_scout_guide_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Intenet Service" v-model="chem_odd_internet_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Student Welfare Fund" v-model="chem_odd_welfare_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Development" v-model="chem_odd_development_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Library & Lab. Caution Money" v-model="chem_odd_library_caution_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Transport Fee" v-model="chem_odd_transport_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Training & Placement" v-model="chem_odd_training_placement_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Festival" v-model="chem_odd_college_festival_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Medical Fee" v-model="chem_odd_medical_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Late Fine" v-model="chem_odd_late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-menu
                          v-model="menu_chem_odd"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="chem_odd_last_date"
                              label="Last Date of Admisson"
                              append-icon="event"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="chem_odd_date" @input="menu_chem_odd = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
                  <div class="flex-grow-0"></div>
                  <v-btn type="submit" color="success darken-1" width="115" @click="chem_fee_update">Save</v-btn>
                  <v-btn color="error darken-1" width="115" @click="chem_odd_reset">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item value="even">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Govt. Dues" v-model="chem_even_govt_dues" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Tuition Fee" v-model="chem_even_tuition_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Examination Fee" v-model="chem_even_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Laboratory Fee" v-model="chem_even_laboratory_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Enrolment Fee" v-model="chem_even_enrolment_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Intenet Service" v-model="chem_even_internet_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Development" v-model="chem_even_development_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Transport Fee" v-model="chem_even_transport_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="College Festival" v-model="chem_even_college_festival_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Medical Fee" v-model="chem_even_medical_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Late Fine" v-model="chem_even_late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-menu
                          v-model="menu_chem_even"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="chem_even_last_date"
                              label="Last Date of Admisson"
                              append-icon="event"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="chem_even_date" @input="menu_chem_even = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
                  <div class="flex-grow-0"></div>
                  <v-btn type="submit" color="success darken-1" width="115" @click="chem_even_fee_update">Save</v-btn>
                  <v-btn color="error darken-1" width="115" @click="chem_even_reset">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-tab-item>

      <v-tab-item value="phd">
        <v-card flat class="elevation-10">
          <v-card-text>
            <!-- <span>{{fee_data[0]['admission_fee']}}</span> -->
          </v-card-text>
          <v-card-text class="mt-4 pt-0 my-0 py-0">
            <v-row justify="space-between">
                <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                  <v-text-field label="Govt. Dues" v-model="phd_govt_dues" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Tuition Fee" v-model="phd_tuition_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Identity Card" v-model="phd_identity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Examination Fee" v-model="phd_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Student Union Fee" v-model="phd_student_union_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Gamse and Sports" v-model="phd_game_sports_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Magazine Fee" v-model="phd_magazine_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Laboratory Fee" v-model="phd_laboratory_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="University Registration Fee" v-model="phd_university_registration_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Enrolment Fee" v-model="phd_enrolment_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Electricity" v-model="phd_electricity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Group Insurance" v-model="phd_group_insurance_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Scout & Guide" v-model="phd_scout_guide_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Intenet Service" v-model="phd_internet_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Student Welfare Fund" v-model="phd_welfare_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="College Development" v-model="phd_development_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Library & Lab. Caution Money" v-model="phd_library_caution_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Transport Fee" v-model="phd_transport_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Training & Placement" v-model="phd_training_placement_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="College Festival" v-model="phd_college_festival_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-text-field label="Medical Fee" v-model="phd_medical_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                  <v-text-field label="Late Fine" v-model="phd_late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                  <v-menu
                    v-model="menu_phd"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="phd_last_date"
                        label="Last Date of Admisson"
                        append-icon="event"
                        v-on="on"
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="phd_date" @input="menu_phd = false"></v-date-picker>
                  </v-menu>
                </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
            <div class="flex-grow-0"></div>
            <v-btn type="submit" color="success darken-1" width="115" @click="phd_fee_update">Save</v-btn>
            <v-btn color="error darken-1" width="115" @click="phd_reset">Reset</v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <v-dialog v-model="snackbar" width="400" timeout="3000">
      <v-card>
        <v-card-title>Status</v-card-title>
        <v-card-text>
          <v-alert v-if="errorOccure" type="error">
            {{msg}}
          </v-alert>
          <v-alert v-else type="success">
            {{msg}}
          </v-alert>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="snackbar=false">Close</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-overlay :value="isPageLoad">
      <v-progress-circular indeterminate color="grey darken-3" size="30"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      isPageLoad: false,
      tab: null,
      tabs: 5,
      tab_title: ['Bachelor of Science','Bachelor of Science in Information Technology','Bachelor of Engineering','Master of Science','Master of Science(Chemistry)','PhD'],
      semester_tab: null,
      semester_title: ['odd semester', 'even semester'],
      rupee_icon: "mdi-currency-inr",

      bsc_odd_last_date: '',
      bsc_even_last_date: '',
      it_odd_last_date: '',
      it_even_last_date: '',
      be_odd_last_date: '',
      be_even_last_date: '',
      msc_odd_last_date: '',
      msc_even_last_date: '',
      chem_odd_last_date: '',
      chem_even_last_date: '',
      phd_last_date: '',

      bsc_odd_date: new Date().toISOString().substr(0, 10),
      bsc_even_date: new Date().toISOString().substr(0, 10),
      it_odd_date: new Date().toISOString().substr(0, 10),
      it_even_date: new Date().toISOString().substr(0, 10),
      be_odd_date: new Date().toISOString().substr(0, 10),
      be_even_date: new Date().toISOString().substr(0, 10),
      msc_odd_date: new Date().toISOString().substr(0, 10),
      msc_even_date: new Date().toISOString().substr(0, 10),
      chem_odd_date: new Date().toISOString().substr(0, 10),
      chem_even_date: new Date().toISOString().substr(0, 10),
      phd_date: new Date().toISOString().substr(0, 10),

      menu_bsc_odd: false,
      menu_bsc_even: false,
      menu_it_odd: false,
      menu_it_even: false,
      menu_be_odd: false,
      menu_be_even: false,
      menu_msc_odd: false,
      menu_msc_even: false,
      menu_chem_odd: false,
      menu_chem_even: false,
      menu_phd: false,



      bsc_odd_depertment_id: '',
      bsc_odd_branch_id: [],
      bsc_odd_semester: '',
      bsc_odd_govt_dues: '',
      bsc_odd_tuition_fee: '',
      bsc_odd_identity_fee: '',
      bsc_odd_examination_fee: '',
      bsc_odd_student_union_fee: '',
      bsc_odd_game_sports_fee: '',
      bsc_odd_magazine_fee: '',
      bsc_odd_laboratory_fee: '',
      bsc_odd_university_registration_fee: '',
      bsc_odd_enrolment_fee: '',
      bsc_odd_electricity_fee: '',
      bsc_odd_group_insurance_fee: '',
      bsc_odd_scout_guide_fee: '',
      bsc_odd_internet_fee: '',
      bsc_odd_welfare_fee: '',
      bsc_odd_development_fee: '',
      bsc_odd_library_caution_fee: '',
      bsc_odd_transport_fee: '',
      bsc_odd_training_placement_fee: '',
      bsc_odd_college_festival_fee: '',
      bsc_odd_medical_fee: '',
      bsc_odd_late_fee: '',
      is_bsc_odd_exist: false,
      bsc_odd_table_id: '',

      bsc_even_depertment_id: '',
      bsc_even_branch_id: [],
      bsc_even_semester: '',
      bsc_even_govt_dues: '',
      bsc_even_tuition_fee: '',
      bsc_even_examination_fee: '',
      bsc_even_laboratory_fee: '',
      bsc_even_enrolment_fee: '',
      bsc_even_internet_fee: '',
      bsc_even_development_fee: '',
      bsc_even_transport_fee: '',
      bsc_even_college_festival_fee: '',
      bsc_even_medical_fee: '',
      bsc_even_late_fee: '',
      is_bsc_even_exist: false,
      bsc_even_table_id: '',



      it_odd_depertment_id: '',
      it_odd_branch_id: [],
      it_odd_semester: '',
      it_odd_govt_dues: '',
      it_odd_tuition_fee: '',
      it_odd_identity_fee: '',
      it_odd_examination_fee: '',
      it_odd_student_union_fee: '',
      it_odd_game_sports_fee: '',
      it_odd_magazine_fee: '',
      it_odd_laboratory_fee: '',
      it_odd_university_registration_fee: '',
      it_odd_enrolment_fee: '',
      it_odd_electricity_fee: '',
      it_odd_group_insurance_fee: '',
      it_odd_scout_guide_fee: '',
      it_odd_internet_fee: '',
      it_odd_welfare_fee: '',
      it_odd_development_fee: '',
      it_odd_library_caution_fee: '',
      it_odd_transport_fee: '',
      it_odd_training_placement_fee: '',
      it_odd_college_festival_fee: '',
      it_odd_medical_fee: '',
      it_odd_late_fee: '',
      is_it_odd_exist: false,
      it_odd_table_id: '',

      it_even_depertment_id: '',
      it_even_branch_id: [],
      it_even_semester: '',
      it_even_govt_dues: '',
      it_even_tuition_fee: '',
      it_even_examination_fee: '',
      it_even_laboratory_fee: '',
      it_even_enrolment_fee: '',
      it_even_internet_fee: '',
      it_even_development_fee: '',
      it_even_transport_fee: '',
      it_even_college_festival_fee: '',
      it_even_medical_fee: '',
      it_even_late_fee: '',
      is_it_even_exist: false,
      it_even_table_id: '',


      be_odd_depertment_id: '',
      be_odd_branch_id: [],
      be_odd_semester: '',
      be_odd_govt_dues: '',
      be_odd_identity_fee: '',
      be_odd_examination_fee: '',
      be_odd_student_union_fee: '',
      be_odd_game_sports_fee: '',
      be_odd_magazine_fee: '',
      be_odd_laboratory_fee: '',
      be_odd_university_registration_fee: '',
      be_odd_enrolment_fee: '',
      be_odd_electricity_fee: '',
      be_odd_group_insurance_fee: '',
      be_odd_scout_guide_fee: '',
      be_odd_internet_fee: '',
      be_odd_welfare_fee: '',
      be_odd_development_fee: '',
      be_odd_library_caution_fee: '',
      be_odd_transport_fee: '',
      be_odd_iste_fee: '',
      be_odd_training_placement_fee: '',
      be_odd_college_festival_fee: '',
      be_odd_medical_fee: '',
      be_odd_late_fee: '',
      is_be_odd_exist: false,
      be_odd_table_id: '',

      be_even_depertment_id: '',
      be_even_branch_id: [],
      be_even_semester: '',
      be_even_govt_dues: '',
      be_even_examination_fee: '',
      be_even_laboratory_fee: '',
      be_even_enrolment_fee: '',
      be_even_internet_fee: '',
      be_even_development_fee: '',
      be_even_transport_fee: '',
      be_even_medical_fee: '',
      be_even_late_fee: '',
      is_be_even_exist: false,
      be_even_table_id: '',


      msc_odd_depertment_id: '',
      msc_odd_branch_id: [],
      msc_odd_semester: '',
      msc_odd_govt_dues: '',
      msc_odd_tuition_fee: '',
      msc_odd_identity_fee: '',
      msc_odd_examination_fee: '',
      msc_odd_student_union_fee: '',
      msc_odd_game_sports_fee: '',
      msc_odd_magazine_fee: '',
      msc_odd_laboratory_fee: '',
      msc_odd_university_registration_fee: '',
      msc_odd_enrolment_fee: '',
      msc_odd_electricity_fee: '',
      msc_odd_group_insurance_fee: '',
      msc_odd_scout_guide_fee: '',
      msc_odd_internet_fee: '',
      msc_odd_welfare_fee: '',
      msc_odd_development_fee: '',
      msc_odd_library_caution_fee: '',
      msc_odd_transport_fee: '',
      msc_odd_training_placement_fee: '',
      msc_odd_college_festival_fee: '',
      msc_odd_medical_fee: '',
      msc_odd_late_fee: '',
      is_msc_odd_exist: false,
      msc_odd_table_id: '',

      msc_even_depertment_id: '',
      msc_even_branch_id: [],
      msc_even_semester: '',
      msc_even_govt_dues: '',
      msc_even_tuition_fee: '',
      msc_even_examination_fee: '',
      msc_even_laboratory_fee: '',
      msc_even_enrolment_fee: '',
      msc_even_internet_fee: '',
      msc_even_development_fee: '',
      msc_even_transport_fee: '',
      msc_even_college_festival_fee: '',
      msc_even_medical_fee: '',
      msc_even_late_fee: '',
      is_msc_even_exist: false,
      msc_even_table_id: '',

      chem_odd_depertment_id: '',
      chem_odd_branch_id: [],
      chem_odd_semester: '',
      chem_odd_govt_dues: '',
      chem_odd_tuition_fee: '',
      chem_odd_identity_fee: '',
      chem_odd_examination_fee: '',
      chem_odd_student_union_fee: '',
      chem_odd_game_sports_fee: '',
      chem_odd_magazine_fee: '',
      chem_odd_laboratory_fee: '',
      chem_odd_university_registration_fee: '',
      chem_odd_enrolment_fee: '',
      chem_odd_electricity_fee: '',
      chem_odd_group_insurance_fee: '',
      chem_odd_scout_guide_fee: '',
      chem_odd_internet_fee: '',
      chem_odd_welfare_fee: '',
      chem_odd_development_fee: '',
      chem_odd_library_caution_fee: '',
      chem_odd_transport_fee: '',
      chem_odd_training_placement_fee: '',
      chem_odd_college_festival_fee: '',
      chem_odd_medical_fee: '',
      chem_odd_late_fee: '',
      is_chem_odd_exist: false,
      chem_odd_table_id: '',

      chem_even_depertment_id: '',
      chem_even_branch_id: [],
      chem_even_semester: '',
      chem_even_govt_dues: '',
      chem_even_tuition_fee: '',
      chem_even_examination_fee: '',
      chem_even_laboratory_fee: '',
      chem_even_enrolment_fee: '',
      chem_even_internet_fee: '',
      chem_even_development_fee: '',
      chem_even_transport_fee: '',
      chem_even_college_festival_fee: '',
      chem_even_medical_fee: '',
      chem_even_late_fee: '',
      is_chem_even_exist: false,
      chem_even_table_id: '',



      phd_depertment_id: '',
      phd_branch_id: [],
      phd_govt_dues: '',
      phd_tuition_fee: '',
      phd_identity_fee: '',
      phd_examination_fee: '',
      phd_student_union_fee: '',
      phd_game_sports_fee: '',
      phd_magazine_fee: '',
      phd_laboratory_fee: '',
      phd_university_registration_fee: '',
      phd_enrolment_fee: '',
      phd_electricity_fee: '',
      phd_group_insurance_fee: '',
      phd_scout_guide_fee: '',
      phd_internet_fee: '',
      phd_welfare_fee: '',
      phd_development_fee: '',
      phd_library_caution_fee: '',
      phd_transport_fee: '',
      phd_training_placement_fee: '',
      phd_college_festival_fee: '',
      phd_medical_fee: '',
      phd_late_fee: '',
      is_phd_exist: false,
      phd_table_id: '',

      fee_data: [],
      be_fee_data: [],
      errorOccure: false,
      snackbar: false, // used to show the success or error msg.
      msg: '', // Success or Error msg after form submission
      is_bsc_data_loaded: true, // To display loading animation on bsc tab.
      chem_id: '',
      phy_id: '',
      math_id: '',
      headers: {
        'Authorization':'Bearer '+ this.$store.state.token,
      },

      rules: {
        // required: value => !!value || 'Required',
        number: value => (/^[0-9.]{1,50}$/.test(value)) || 'This field must be a numerical value.',
        // lastDate: () => (new Date(this.date).getTime() > this.present_date.getTime()) || 'Last Date should not be a expire date.',
      },
    }
  },

  mounted() {
    document.title = "Admission Fee Setting"
    localStorage.setItem('last_URL','/settings')
    this.isPageLoad = true
    return new Promise((resolve,reject) => {
      axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        for(var m=0; m<response.data.length; m++){
          if(response.data[m]['branch_name']=="Chemistry") {
            this.chem_id = response.data[m]['id']
          }
          if(response.data[m]['branch_name']=="Physics") {
            this.phy_id = response.data[m]['id']
          }
          if(response.data[m]['branch_name']=="Mathematics") {
            this.math_id = response.data[m]['id']
          }
        }
      })

      axios({url: this.$store.state.odd_semester_fees_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        this.fee_data = response.data
        console.log('fee_data::',this.fee_data);
        this.get_fee_data('PhD')
        this.get_fee_data('Bachelor of Science')
        this.get_fee_data('Bachelor of Science in Information Technology')
        this.get_fee_data('Master of Science')
        resolve(response)
      })
      .catch(error=>{
        if(error.response && error.response.status==401){
          // Logout user if the token is invalid.
          var token = this.$store.state.token
          var client_id = this.$store.state.client_id
          var client_secret = this.$store.state.client_secret
          this.$store.dispatch('logout',{token, client_id, client_secret})
          .then(() => {
            this.$router.push('/signin')
          })
        }
        reject(error)
      })

      axios({url: this.$store.state.be_fees_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        this.be_fee_data = response.data
        this.get_be_fee_data('Bachelor of Engineering')
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
    })

  },

  computed: {

  },

  watch: {
    bsc_odd_date() {
      this.bsc_odd_last_date = this.formatDate(this.bsc_odd_date)
    },
    bsc_even_date() {
      this.bsc_even_last_date = this.formatDate(this.bsc_even_date)
    },
    // bsc_odd_admission_fee(){
    //   this.bsc_odd_admission_fee = this.parseInput(this.bsc_odd_admission_fee)
    // },

    it_odd_date() {
      this.it_odd_last_date = this.formatDate(this.it_odd_date)
    },
    it_even_date() {
      this.it_even_last_date = this.formatDate(this.it_even_date)
    },

    be_odd_date() {
      this.be_odd_last_date = this.formatDate(this.be_odd_date)
    },
    be_even_date() {
      this.be_even_last_date = this.formatDate(this.be_even_date)
    },

    msc_odd_date() {
      this.msc_odd_last_date = this.formatDate(this.msc_odd_date)
    },
    msc_even_date() {
      this.msc_even_last_date = this.formatDate(this.msc_even_date)
    },

    chem_odd_date() {
      this.chem_odd_last_date = this.formatDate(this.chem_odd_date)
    },
    chem_even_date() {
      this.chem_even_last_date = this.formatDate(this.chem_even_date)
    },

    be_date() {
      this.be_last_date = this.formatDate(this.be_date)
    },
    phd_date() {
      this.phd_last_date = this.formatDate(this.phd_date)
    },
  },

  methods: {
    parseInput(input) {
      if(!input) return null
      input = Number(input.toString().replace(',','')).toFixed(2)
      return input
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    convertDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('/')
      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
    },

    bsc_fee_update() {
      this.isPageLoad = true
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == 'Bachelor of Science'){
              this.bsc_odd_depertment_id = response.data[i]['id']
            }
          }
          var branch = ['Physics', 'Chemistry', 'Mathematics']
          axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            for(var i = 0; i < response.data.length; i++){
              for(var j=0; j < branch.length; j++){
                if(response.data[i]['branch_name'] == branch[j]){
                  this.bsc_odd_branch_id.push(response.data[i]['id'])
                }
              }
            }

            if(this.is_bsc_odd_exist){
              axios({url: this.$store.state.odd_semester_fees_end_point +this.bsc_odd_table_id+'/', method: 'PUT',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.bsc_odd_govt_dues),
                tuition_fee: this.parseInput(this.bsc_odd_tuition_fee),
                identity_fee: this.parseInput(this.bsc_odd_identity_fee),
                examination_fee: this.parseInput(this.bsc_odd_examination_fee),
                student_union_fee: this.parseInput(this.bsc_odd_student_union_fee),
                game_sports_fee: this.parseInput(this.bsc_odd_game_sports_fee),
                magazine_fee: this.parseInput(this.bsc_odd_magazine_fee),
                laboratory_fee: this.parseInput(this.bsc_odd_laboratory_fee),
                university_registration_fee: this.parseInput(this.bsc_odd_university_registration_fee),
                enrolment_fee: this.parseInput(this.bsc_odd_enrolment_fee),
                electricity_fee: this.parseInput(this.bsc_odd_electricity_fee),
                group_insurance_fee: this.parseInput(this.bsc_odd_group_insurance_fee),
                scout_guide_fee: this.parseInput(this.bsc_odd_scout_guide_fee),
                internet_fee: this.parseInput(this.bsc_odd_internet_fee),
                welfare_fee: this.parseInput(this.bsc_odd_welfare_fee),
                development_fee: this.parseInput(this.bsc_odd_development_fee),
                library_caution_fee: this.parseInput(this.bsc_odd_library_caution_fee),
                transport_fee: this.parseInput(this.bsc_odd_transport_fee),
                training_placement_fee: this.parseInput(this.bsc_odd_training_placement_fee),
                college_festival_fee: this.parseInput(this.bsc_odd_college_festival_fee),
                medical_fee: this.parseInput(this.bsc_odd_medical_fee),
                late_fee: this.parseInput(this.bsc_odd_late_fee),
                last_admission_date: this.convertDate(this.bsc_odd_last_date),
                depertment_id: this.bsc_odd_depertment_id,
                branch: this.bsc_odd_branch_id,
                semester: "Odd",
              },
            })
            .then(response => {
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'Successfully Updated Fees.'
            })
            .catch(error => {
              this.errorOccure = true
              this.snackbar = true
              this.msg = 'Please fill the fields correctly.'
            })
          }
          else{
                axios({url: this.$store.state.odd_semester_fees_end_point, method: 'POST',
                headers: this.headers,
                data: {
                  govt_dues: this.parseInput(this.bsc_odd_govt_dues),
                  tuition_fee: this.parseInput(this.bsc_odd_tuition_fee),
                  identity_fee: this.parseInput(this.bsc_odd_identity_fee),
                  examination_fee: this.parseInput(this.bsc_odd_examination_fee),
                  student_union_fee: this.parseInput(this.bsc_odd_student_union_fee),
                  game_sports_fee: this.parseInput(this.bsc_odd_game_sports_fee),
                  magazine_fee: this.parseInput(this.bsc_odd_magazine_fee),
                  laboratory_fee: this.parseInput(this.bsc_odd_laboratory_fee),
                  university_registration_fee: this.parseInput(this.bsc_odd_university_registration_fee),
                  enrolment_fee: this.parseInput(this.bsc_odd_enrolment_fee),
                  electricity_fee: this.parseInput(this.bsc_odd_electricity_fee),
                  group_insurance_fee: this.parseInput(this.bsc_odd_group_insurance_fee),
                  scout_guide_fee: this.parseInput(this.bsc_odd_scout_guide_fee),
                  internet_fee: this.parseInput(this.bsc_odd_internet_fee),
                  welfare_fee: this.parseInput(this.bsc_odd_welfare_fee),
                  development_fee: this.parseInput(this.bsc_odd_development_fee),
                  library_caution_fee: this.parseInput(this.bsc_odd_library_caution_fee),
                  transport_fee: this.parseInput(this.bsc_odd_transport_fee),
                  training_placement_fee: this.parseInput(this.bsc_odd_training_placement_fee),
                  college_festival_fee: this.parseInput(this.bsc_odd_college_festival_fee),
                  medical_fee: this.parseInput(this.bsc_odd_medical_fee),
                  late_fee: this.parseInput(this.bsc_odd_late_fee),
                  last_admission_date: this.convertDate(this.bsc_odd_last_date),
                  depertment_id: this.bsc_odd_depertment_id,
                  branch: this.bsc_odd_branch_id,
                  semester: "Odd",
                },
              })
              .then(response => {
                this.errorOccure = false
                this.snackbar = true
                this.msg = 'Successfully Updated Fees.'
              })
              .catch(error => {
                this.errorOccure = true
                this.snackbar = true
                this.msg = 'Please fill the fields correctly.'
              })
            }
          })
          this.isPageLoad = false
      })
    },
    bsc_even_fee_update() {
      this.isPageLoad = true
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == 'Bachelor of Science'){
              this.bsc_even_depertment_id = response.data[i]['id']
            }
          }
          var branch = ['Physics', 'Chemistry', 'Mathematics']
          axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            for(var i = 0; i < response.data.length; i++){
              for(var j=0; j < branch.length; j++){
                if(response.data[i]['branch_name'] == branch[j]){
                  this.bsc_even_branch_id.push(response.data[i]['id'])
                }
              }
            }

            if(this.is_bsc_even_exist){
              axios({url: this.$store.state.odd_semester_fees_end_point +this.bsc_even_table_id+'/', method: 'PUT',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.bsc_even_govt_dues),
                tuition_fee: this.parseInput(this.bsc_even_tuition_fee),
                examination_fee: this.parseInput(this.bsc_even_examination_fee),
                laboratory_fee: this.parseInput(this.bsc_even_laboratory_fee),
                enrolment_fee: this.parseInput(this.bsc_even_enrolment_fee),
                internet_fee: this.parseInput(this.bsc_even_internet_fee),
                development_fee: this.parseInput(this.bsc_even_development_fee),
                transport_fee: this.parseInput(this.bsc_even_transport_fee),
                medical_fee: this.parseInput(this.bsc_even_medical_fee),
                late_fee: this.parseInput(this.bsc_even_late_fee),
                last_admission_date: this.convertDate(this.bsc_even_last_date),
                depertment_id: this.bsc_even_depertment_id,
                branch: this.bsc_even_branch_id,
                semester: "Even",
              },
            })
            .then(response => {
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'Successfully Updated Fees.'
            })
            .catch(error => {
              this.errorOccure = true
              this.snackbar = true
              this.msg = 'Please fill the fields correctly.'
            })
          }
          else{
                axios({url: this.$store.state.odd_semester_fees_end_point, method: 'POST',
                headers: this.headers,
                data: {
                  govt_dues: this.parseInput(this.bsc_even_govt_dues),
                  tuition_fee: this.parseInput(this.bsc_even_tuition_fee),
                  examination_fee: this.parseInput(this.bsc_even_examination_fee),
                  laboratory_fee: this.parseInput(this.bsc_even_laboratory_fee),
                  enrolment_fee: this.parseInput(this.bsc_even_enrolment_fee),
                  internet_fee: this.parseInput(this.bsc_even_internet_fee),
                  development_fee: this.parseInput(this.bsc_even_development_fee),
                  transport_fee: this.parseInput(this.bsc_even_transport_fee),
                  medical_fee: this.parseInput(this.bsc_even_medical_fee),
                  late_fee: this.parseInput(this.bsc_even_late_fee),
                  last_admission_date: this.convertDate(this.bsc_even_last_date),
                  depertment_id: this.bsc_even_depertment_id,
                  branch: this.bsc_even_branch_id,
                  semester: "Even",
                },
              })
              .then(response => {
                this.errorOccure = false
                this.snackbar = true
                this.msg = 'Successfully Updated Fees.'
              })
              .catch(error => {
                this.errorOccure = true
                this.snackbar = true
                this.msg = 'Please fill the fields correctly.'
              })
            }
          })
          this.isPageLoad = false
      })
    },

    it_fee_update() {
      this.isPageLoad = true
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == 'Bachelor of Science in Information Technology'){
              this.it_odd_depertment_id = response.data[i]['id']
            }
          }

          var branch = ['Information Technology']
          axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            for(var i = 0; i < response.data.length; i++){
              for(var j=0; j < branch.length; j++){
                if(response.data[i]['branch_name'] == branch[j]){
                  this.it_odd_branch_id.push(response.data[i]['id'])
                }
              }
            }

            if(this.is_it_odd_exist){
              axios({url: this.$store.state.odd_semester_fees_end_point +this.it_odd_table_id+'/', method: 'PUT',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.it_odd_govt_dues),
                tuition_fee: this.parseInput(this.it_odd_tuition_fee),
                identity_fee: this.parseInput(this.it_odd_identity_fee),
                examination_fee: this.parseInput(this.it_odd_examination_fee),
                student_union_fee: this.parseInput(this.it_odd_student_union_fee),
                game_sports_fee: this.parseInput(this.it_odd_game_sports_fee),
                magazine_fee: this.parseInput(this.it_odd_magazine_fee),
                laboratory_fee: this.parseInput(this.it_odd_laboratory_fee),
                university_registration_fee: this.parseInput(this.it_odd_university_registration_fee),
                enrolment_fee: this.parseInput(this.it_odd_enrolment_fee),
                electricity_fee: this.parseInput(this.it_odd_electricity_fee),
                group_insurance_fee: this.parseInput(this.it_odd_group_insurance_fee),
                scout_guide_fee: this.parseInput(this.it_odd_scout_guide_fee),
                internet_fee: this.parseInput(this.it_odd_internet_fee),
                welfare_fee: this.parseInput(this.it_odd_welfare_fee),
                development_fee: this.parseInput(this.it_odd_development_fee),
                library_caution_fee: this.parseInput(this.it_odd_library_caution_fee),
                transport_fee: this.parseInput(this.it_odd_transport_fee),
                training_placement_fee: this.parseInput(this.it_odd_training_placement_fee),
                college_festival_fee: this.parseInput(this.it_odd_college_festival_fee),
                medical_fee: this.parseInput(this.it_odd_medical_fee),
                late_fee: this.parseInput(this.it_odd_late_fee),
                last_admission_date: this.convertDate(this.it_odd_last_date),
                depertment_id: this.it_odd_depertment_id,
                branch: this.it_odd_branch_id,
                semester: "Odd",
              },
            })
            .then(response => {
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'Successfully Updated Fees.'
            })
            .catch(error => {
              this.errorOccure = true
              this.snackbar = true
              this.msg = 'Please fill the fields correctly.'
            })
          }
          else{
                axios({url: this.$store.state.odd_semester_fees_end_point, method: 'POST',
                headers: this.headers,
                data: {
                  govt_dues: this.parseInput(this.it_odd_govt_dues),
                  tuition_fee: this.parseInput(this.it_odd_tuition_fee),
                  identity_fee: this.parseInput(this.it_odd_identity_fee),
                  examination_fee: this.parseInput(this.it_odd_examination_fee),
                  student_union_fee: this.parseInput(this.it_odd_student_union_fee),
                  game_sports_fee: this.parseInput(this.it_odd_game_sports_fee),
                  magazine_fee: this.parseInput(this.it_odd_magazine_fee),
                  laboratory_fee: this.parseInput(this.it_odd_laboratory_fee),
                  university_registration_fee: this.parseInput(this.it_odd_university_registration_fee),
                  enrolment_fee: this.parseInput(this.it_odd_enrolment_fee),
                  electricity_fee: this.parseInput(this.it_odd_electricity_fee),
                  group_insurance_fee: this.parseInput(this.it_odd_group_insurance_fee),
                  scout_guide_fee: this.parseInput(this.it_odd_scout_guide_fee),
                  internet_fee: this.parseInput(this.it_odd_internet_fee),
                  welfare_fee: this.parseInput(this.it_odd_welfare_fee),
                  development_fee: this.parseInput(this.it_odd_development_fee),
                  library_caution_fee: this.parseInput(this.it_odd_library_caution_fee),
                  transport_fee: this.parseInput(this.it_odd_transport_fee),
                  training_placement_fee: this.parseInput(this.it_odd_training_placement_fee),
                  college_festival_fee: this.parseInput(this.it_odd_college_festival_fee),
                  medical_fee: this.parseInput(this.it_odd_medical_fee),
                  late_fee: this.parseInput(this.it_odd_late_fee),
                  last_admission_date: this.convertDate(this.it_odd_last_date),
                  depertment_id: this.it_odd_depertment_id,
                  branch: this.it_odd_branch_id,
                  semester: "Odd",
                },
              })
              .then(response => {
                this.errorOccure = false
                this.snackbar = true
                this.msg = 'Successfully Updated Fees.'
              })
              .catch(error => {
                this.errorOccure = true
                this.snackbar = true
                this.msg = 'Please fill the fields correctly.'
              })
            }
          })
          this.isPageLoad = false
      })
    },
    it_even_fee_update() {
      this.isPageLoad = true
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == 'Bachelor of Science in Information Technology'){
              this.it_even_depertment_id = response.data[i]['id']
            }
          }
          var branch = ['Information Technology']
          axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            for(var i = 0; i < response.data.length; i++){
              for(var j=0; j < branch.length; j++){
                if(response.data[i]['branch_name'] == branch[j]){
                  this.it_even_branch_id.push(response.data[i]['id'])
                }
              }
            }

            if(this.is_it_even_exist){
              axios({url: this.$store.state.odd_semester_fees_end_point +this.it_even_table_id+'/', method: 'PUT',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.it_even_govt_dues),
                tuition_fee: this.parseInput(this.it_even_tuition_fee),
                examination_fee: this.parseInput(this.it_even_examination_fee),
                laboratory_fee: this.parseInput(this.it_even_laboratory_fee),
                enrolment_fee: this.parseInput(this.it_even_enrolment_fee),
                internet_fee: this.parseInput(this.it_even_internet_fee),
                development_fee: this.parseInput(this.it_even_development_fee),
                transport_fee: this.parseInput(this.it_even_transport_fee),
                medical_fee: this.parseInput(this.it_even_medical_fee),
                late_fee: this.parseInput(this.it_even_late_fee),
                last_admission_date: this.convertDate(this.it_even_last_date),
                depertment_id: this.it_even_depertment_id,
                branch: this.it_even_branch_id,
                semester: "Even",
              },
            })
            .then(response => {
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'Successfully Updated Fees.'
            })
            .catch(error => {
              this.errorOccure = true
              this.snackbar = true
              this.msg = 'Please fill the fields correctly.'
            })
          }
          else{
                axios({url: this.$store.state.odd_semester_fees_end_point, method: 'POST',
                headers: this.headers,
                data: {
                  govt_dues: this.parseInput(this.it_even_govt_dues),
                  tuition_fee: this.parseInput(this.it_even_tuition_fee),
                  examination_fee: this.parseInput(this.it_even_examination_fee),
                  laboratory_fee: this.parseInput(this.it_even_laboratory_fee),
                  enrolment_fee: this.parseInput(this.it_even_enrolment_fee),
                  internet_fee: this.parseInput(this.it_even_internet_fee),
                  development_fee: this.parseInput(this.it_even_development_fee),
                  medical_fee: this.parseInput(this.it_even_medical_fee),
                  transport_fee: this.parseInput(this.it_even_transport_fee),
                  late_fee: this.parseInput(this.it_even_late_fee),
                  last_admission_date: this.convertDate(this.it_even_last_date),
                  depertment_id: this.it_even_depertment_id,
                  branch: this.it_even_branch_id,
                  semester: "Even",
                },
              })
              .then(response => {
                this.errorOccure = false
                this.snackbar = true
                this.msg = 'Successfully Updated Fees.'
              })
              .catch(error => {
                this.errorOccure = true
                this.snackbar = true
                this.msg = 'Please fill the fields correctly.'
              })
            }
          })
          this.isPageLoad = false
      })
    },

    be_fee_update() {
      this.isPageLoad = true
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == 'Bachelor of Engineering'){
              this.be_odd_depertment_id = response.data[i]['id']
            }
          }

          var branch = ['Power Electronics & Instrumentation Engineering','Electronics & Telecommunication Engineering', 'Civil Engineering','Mechanical Engineering']
          axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            for(var i = 0; i < response.data.length; i++){
              for(var j=0; j < branch.length; j++){
                if(response.data[i]['branch_name'] == branch[j]){
                  this.be_odd_branch_id.push(response.data[i]['id'])
                }
              }
            }

            if(this.is_be_odd_exist){
              axios({url: this.$store.state.be_fees_end_point +this.be_odd_table_id+'/', method: 'PUT',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.be_odd_govt_dues),
                identity_fee: this.parseInput(this.be_odd_identity_fee),
                examination_fee: this.parseInput(this.be_odd_examination_fee),
                student_union_fee: this.parseInput(this.be_odd_student_union_fee),
                game_sports_fee: this.parseInput(this.be_odd_game_sports_fee),
                magazine_fee: this.parseInput(this.be_odd_magazine_fee),
                laboratory_fee: this.parseInput(this.be_odd_laboratory_fee),
                university_registration_fee: this.parseInput(this.be_odd_university_registration_fee),
                enrolment_fee: this.parseInput(this.be_odd_enrolment_fee),
                electricity_fee: this.parseInput(this.be_odd_electricity_fee),
                group_insurance_fee: this.parseInput(this.be_odd_group_insurance_fee),
                scout_guide_fee: this.parseInput(this.be_odd_scout_guide_fee),
                internet_fee: this.parseInput(this.be_odd_internet_fee),
                welfare_fee: this.parseInput(this.be_odd_welfare_fee),
                development_fee: this.parseInput(this.be_odd_development_fee),
                library_caution_fee: this.parseInput(this.be_odd_library_caution_fee),
                transport_fee: this.parseInput(this.be_odd_transport_fee),
                iste_fee: this.parseInput(this.be_odd_iste_fee),
                training_placement_fee: this.parseInput(this.be_odd_training_placement_fee),
                college_festival_fee: this.parseInput(this.be_odd_college_festival_fee),
                medical_fee: this.parseInput(this.be_odd_medical_fee),
                late_fee: this.parseInput(this.be_odd_late_fee),
                last_admission_date: this.convertDate(this.be_odd_last_date),
                depertment_id: this.be_odd_depertment_id,
                branch: this.be_odd_branch_id,
                semester: "Odd",
              },
            })
            .then(response => {
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'Successfully Updated Fees.'
            })
            .catch(error => {
              this.errorOccure = true
              this.snackbar = true
              this.msg = 'Please fill the fields correctly.'
            })
          }
          else{
                axios({url: this.$store.state.be_fees_end_point, method: 'POST',
                headers: this.headers,
                data: {
                  govt_dues: this.parseInput(this.be_odd_govt_dues),
                  identity_fee: this.parseInput(this.be_odd_identity_fee),
                  examination_fee: this.parseInput(this.be_odd_examination_fee),
                  student_union_fee: this.parseInput(this.be_odd_student_union_fee),
                  game_sports_fee: this.parseInput(this.be_odd_game_sports_fee),
                  magazine_fee: this.parseInput(this.be_odd_magazine_fee),
                  laboratory_fee: this.parseInput(this.be_odd_laboratory_fee),
                  university_registration_fee: this.parseInput(this.be_odd_university_registration_fee),
                  enrolment_fee: this.parseInput(this.be_odd_enrolment_fee),
                  electricity_fee: this.parseInput(this.be_odd_electricity_fee),
                  group_insurance_fee: this.parseInput(this.be_odd_group_insurance_fee),
                  scout_guide_fee: this.parseInput(this.be_odd_scout_guide_fee),
                  internet_fee: this.parseInput(this.be_odd_internet_fee),
                  welfare_fee: this.parseInput(this.be_odd_welfare_fee),
                  development_fee: this.parseInput(this.be_odd_development_fee),
                  library_caution_fee: this.parseInput(this.be_odd_library_caution_fee),
                  transport_fee: this.parseInput(this.be_odd_transport_fee),
                  iste_fee: this.parseInput(this.be_odd_iste_fee),
                  training_placement_fee: this.parseInput(this.be_odd_training_placement_fee),
                  college_festival_fee: this.parseInput(this.be_odd_college_festival_fee),
                  medical_fee: this.parseInput(this.be_odd_medical_fee),
                  late_fee: this.parseInput(this.be_odd_late_fee),
                  last_admission_date: this.convertDate(this.be_odd_last_date),
                  depertment_id: this.be_odd_depertment_id,
                  branch: this.be_odd_branch_id,
                  semester: "Odd",
                },
              })
              .then(response => {
                this.errorOccure = false
                this.snackbar = true
                this.msg = 'Successfully Updated Fees.'
              })
              .catch(error => {
                this.errorOccure = true
                this.snackbar = true
                this.msg = 'Please fill the fields correctly.'
              })
            }
          })
          this.isPageLoad = false
      })
    },
    be_even_fee_update() {
      this.isPageLoad = true
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == 'Bachelor of Engineering'){
              this.be_even_depertment_id = response.data[i]['id']
            }
          }
          var branch = ['Power Electronics & Instrumentation Engineering','Electronics & Telecommunication Engineering', 'Civil Engineering','Mechanical Engineering']
          axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            for(var i = 0; i < response.data.length; i++){
              for(var j=0; j < branch.length; j++){
                if(response.data[i]['branch_name'] == branch[j]){
                  this.be_even_branch_id.push(response.data[i]['id'])
                }
              }
            }

            if(this.is_be_even_exist){
              axios({url: this.$store.state.be_fees_end_point +this.be_even_table_id+'/', method: 'PUT',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.be_even_govt_dues),
                examination_fee: this.parseInput(this.be_even_examination_fee),
                laboratory_fee: this.parseInput(this.be_even_laboratory_fee),
                enrolment_fee: this.parseInput(this.be_even_enrolment_fee),
                internet_fee: this.parseInput(this.be_even_internet_fee),
                development_fee: this.parseInput(this.be_even_development_fee),
                transport_fee: this.parseInput(this.be_even_transport_fee),
                medical_fee: this.parseInput(this.be_even_medical_fee),
                late_fee: this.parseInput(this.be_even_late_fee),
                last_admission_date: this.convertDate(this.be_even_last_date),
                depertment_id: this.be_even_depertment_id,
                branch: this.be_even_branch_id,
                semester: "Even",
              },
            })
            .then(response => {
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'Successfully Updated Fees.'
            })
            .catch(error => {
              this.errorOccure = true
              this.snackbar = true
              this.msg = 'Please fill the fields correctly.'
            })
          }
          else{
                axios({url: this.$store.state.be_fees_end_point, method: 'POST',
                headers: this.headers,
                data: {
                  govt_dues: this.parseInput(this.be_even_govt_dues),
                  examination_fee: this.parseInput(this.be_even_examination_fee),
                  laboratory_fee: this.parseInput(this.be_even_laboratory_fee),
                  enrolment_fee: this.parseInput(this.be_even_enrolment_fee),
                  internet_fee: this.parseInput(this.be_even_internet_fee),
                  development_fee: this.parseInput(this.be_even_development_fee),
                  transport_fee: this.parseInput(this.be_even_transport_fee),
                  medical_fee: this.parseInput(this.be_even_medical_fee),
                  late_fee: this.parseInput(this.be_even_late_fee),
                  last_admission_date: this.convertDate(this.be_even_last_date),
                  depertment_id: this.be_even_depertment_id,
                  branch: this.be_even_branch_id,
                  semester: "Even",
                },
              })
              .then(response => {
                this.errorOccure = false
                this.snackbar = true
                this.msg = 'Successfully Updated Fees.'
              })
              .catch(error => {
                this.errorOccure = true
                this.snackbar = true
                this.msg = 'Please fill the fields correctly.'
              })
            }
          })
          this.isPageLoad = false
      })
    },

    msc_fee_update() {
      this.isPageLoad = true
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == 'Master of Science'){
              this.msc_odd_depertment_id = response.data[i]['id']
            }
          }
          var branch = ['Physics','Mathematics']
          axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            for(var i = 0; i < response.data.length; i++){
              for(var j=0; j < branch.length; j++){
                if(response.data[i]['branch_name'] == branch[j]){
                  this.msc_odd_branch_id.push(response.data[i]['id'])
                }
              }
            }

            if(this.is_msc_odd_exist){
              axios({url: this.$store.state.odd_semester_fees_end_point +this.msc_odd_table_id+'/', method: 'PUT',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.msc_odd_govt_dues),
                tuition_fee: this.parseInput(this.msc_odd_tuition_fee),
                identity_fee: this.parseInput(this.msc_odd_identity_fee),
                examination_fee: this.parseInput(this.msc_odd_examination_fee),
                student_union_fee: this.parseInput(this.msc_odd_student_union_fee),
                game_sports_fee: this.parseInput(this.msc_odd_game_sports_fee),
                magazine_fee: this.parseInput(this.msc_odd_magazine_fee),
                laboratory_fee: this.parseInput(this.msc_odd_laboratory_fee),
                university_registration_fee: this.parseInput(this.msc_odd_university_registration_fee),
                enrolment_fee: this.parseInput(this.msc_odd_enrolment_fee),
                electricity_fee: this.parseInput(this.msc_odd_electricity_fee),
                group_insurance_fee: this.parseInput(this.msc_odd_group_insurance_fee),
                scout_guide_fee: this.parseInput(this.msc_odd_scout_guide_fee),
                internet_fee: this.parseInput(this.msc_odd_internet_fee),
                welfare_fee: this.parseInput(this.msc_odd_welfare_fee),
                development_fee: this.parseInput(this.msc_odd_development_fee),
                library_caution_fee: this.parseInput(this.msc_odd_library_caution_fee),
                transport_fee: this.parseInput(this.msc_odd_transport_fee),
                training_placement_fee: this.parseInput(this.msc_odd_training_placement_fee),
                college_festival_fee: this.parseInput(this.msc_odd_college_festival_fee),
                medical_fee: this.parseInput(this.msc_odd_medical_fee),
                late_fee: this.parseInput(this.msc_odd_late_fee),
                last_admission_date: this.convertDate(this.msc_odd_last_date),
                depertment_id: this.msc_odd_depertment_id,
                branch: this.msc_odd_branch_id,
                semester: "Odd"
              },
            })
            .then(response => {
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'Successfully Updated Fees.'
            })
            .catch(error => {
              this.errorOccure = true
              this.snackbar = true
              this.msg = 'Please fill the fields correctly.'
            })
          }
          else{
            axios({url: this.$store.state.odd_semester_fees_end_point, method: 'POST',
            headers: this.headers,
            data: {
              govt_dues: this.parseInput(this.msc_odd_govt_dues),
              tuition_fee: this.parseInput(this.msc_odd_tuition_fee),
              identity_fee: this.parseInput(this.msc_odd_identity_fee),
              examination_fee: this.parseInput(this.msc_odd_examination_fee),
              student_union_fee: this.parseInput(this.msc_odd_student_union_fee),
              game_sports_fee: this.parseInput(this.msc_odd_game_sports_fee),
              magazine_fee: this.parseInput(this.msc_odd_magazine_fee),
              laboratory_fee: this.parseInput(this.msc_odd_laboratory_fee),
              university_registration_fee: this.parseInput(this.msc_odd_university_registration_fee),
              enrolment_fee: this.parseInput(this.msc_odd_enrolment_fee),
              electricity_fee: this.parseInput(this.msc_odd_electricity_fee),
              group_insurance_fee: this.parseInput(this.msc_odd_group_insurance_fee),
              scout_guide_fee: this.parseInput(this.msc_odd_scout_guide_fee),
              internet_fee: this.parseInput(this.msc_odd_internet_fee),
              welfare_fee: this.parseInput(this.msc_odd_welfare_fee),
              development_fee: this.parseInput(this.msc_odd_development_fee),
              library_caution_fee: this.parseInput(this.msc_odd_library_caution_fee),
              transport_fee: this.parseInput(this.msc_odd_transport_fee),
              training_placement_fee: this.parseInput(this.msc_odd_training_placement_fee),
              college_festival_fee: this.parseInput(this.msc_odd_college_festival_fee),
              medical_fee: this.parseInput(this.msc_odd_medical_fee),
              late_fee: this.parseInput(this.msc_odd_late_fee),
              last_admission_date: this.convertDate(this.msc_odd_last_date),
              depertment_id: this.msc_odd_depertment_id,
              branch: this.msc_odd_branch_id,
              semester: "Odd"
            },
          })
          .then(response => {
            this.errorOccure = false
            this.snackbar = true
            this.msg = 'Successfully Updated Fees.'
          })
          .catch(error => {
            this.errorOccure = true
            this.snackbar = true
            this.msg = 'Please fill the fields correctly.'
          })
        }
          })
          this.isPageLoad = false
      })
    },
    msc_even_fee_update() {
      this.isPageLoad = true
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == 'Master of Science'){
              this.msc_even_depertment_id = response.data[i]['id']
            }
          }
          var branch = ['Physics','Mathematics']
          axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            for(var i = 0; i < response.data.length; i++){
              for(var j=0; j < branch.length; j++){
                if(response.data[i]['branch_name'] == branch[j]){
                  this.msc_even_branch_id.push(response.data[i]['id'])
                }
              }
            }

            if(this.is_msc_even_exist){
              axios({url: this.$store.state.odd_semester_fees_end_point +this.msc_even_table_id+'/', method: 'PUT',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.msc_even_govt_dues),
                tuition_fee: this.parseInput(this.msc_even_tuition_fee),
                examination_fee: this.parseInput(this.msc_even_examination_fee),
                laboratory_fee: this.parseInput(this.msc_even_laboratory_fee),
                enrolment_fee: this.parseInput(this.msc_even_enrolment_fee),
                internet_fee: this.parseInput(this.msc_even_internet_fee),
                development_fee: this.parseInput(this.msc_even_development_fee),
                transport_fee: this.parseInput(this.msc_even_transport_fee),
                college_festival_fee: this.parseInput(this.msc_even_college_festival_fee),
                medical_fee: this.parseInput(this.msc_even_medical_fee),
                late_fee: this.parseInput(this.msc_even_late_fee),
                last_admission_date: this.convertDate(this.msc_even_last_date),
                depertment_id: this.msc_even_depertment_id,
                branch: this.msc_even_branch_id,
                semester: "Even",
              },
            })
            .then(response => {
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'Successfully Updated Fees.'
            })
            .catch(error => {
              this.errorOccure = true
              this.snackbar = true
              this.msg = 'Please fill the fields correctly.'
            })
          }
          else{
                axios({url: this.$store.state.odd_semester_fees_end_point, method: 'POST',
                headers: this.headers,
                data: {
                  govt_dues: this.parseInput(this.msc_even_govt_dues),
                  tuition_fee: this.parseInput(this.msc_even_tuition_fee),
                  examination_fee: this.parseInput(this.msc_even_examination_fee),
                  laboratory_fee: this.parseInput(this.msc_even_laboratory_fee),
                  enrolment_fee: this.parseInput(this.msc_even_enrolment_fee),
                  internet_fee: this.parseInput(this.msc_even_internet_fee),
                  development_fee: this.parseInput(this.msc_even_development_fee),
                  transport_fee: this.parseInput(this.msc_even_transport_fee),
                  college_festival_fee: this.parseInput(this.msc_even_college_festival_fee),
                  medical_fee: this.parseInput(this.msc_even_medical_fee),
                  late_fee: this.parseInput(this.msc_even_late_fee),
                  last_admission_date: this.convertDate(this.msc_even_last_date),
                  depertment_id: this.msc_even_depertment_id,
                  branch: this.msc_even_branch_id,
                  semester: "Even",
                },
              })
              .then(response => {
                this.errorOccure = false
                this.snackbar = true
                this.msg = 'Successfully Updated Fees.'
              })
              .catch(error => {
                this.errorOccure = true
                this.snackbar = true
                this.msg = 'Please fill the fields correctly.'
              })
            }
          })
          this.isPageLoad = false
      })
    },

    chem_fee_update() {
      this.isPageLoad = true
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == 'Master of Science'){
              this.chem_odd_depertment_id = response.data[i]['id']
            }
          }
          var branch = ['Chemistry']
          axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            for(var i = 0; i < response.data.length; i++){
              for(var j=0; j < branch.length; j++){
                if(response.data[i]['branch_name'] == branch[j]){
                  this.chem_odd_branch_id.push(response.data[i]['id'])
                }
              }
            }

            if(this.is_chem_odd_exist){
              axios({url: this.$store.state.odd_semester_fees_end_point +this.chem_odd_table_id+'/', method: 'PUT',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.chem_odd_govt_dues),
                tuition_fee: this.parseInput(this.chem_odd_tuition_fee),
                identity_fee: this.parseInput(this.chem_odd_identity_fee),
                examination_fee: this.parseInput(this.chem_odd_examination_fee),
                student_union_fee: this.parseInput(this.chem_odd_student_union_fee),
                game_sports_fee: this.parseInput(this.chem_odd_game_sports_fee),
                magazine_fee: this.parseInput(this.chem_odd_magazine_fee),
                laboratory_fee: this.parseInput(this.chem_odd_laboratory_fee),
                university_registration_fee: this.parseInput(this.chem_odd_university_registration_fee),
                enrolment_fee: this.parseInput(this.chem_odd_enrolment_fee),
                electricity_fee: this.parseInput(this.chem_odd_electricity_fee),
                group_insurance_fee: this.parseInput(this.chem_odd_group_insurance_fee),
                scout_guide_fee: this.parseInput(this.chem_odd_scout_guide_fee),
                internet_fee: this.parseInput(this.chem_odd_internet_fee),
                welfare_fee: this.parseInput(this.chem_odd_welfare_fee),
                development_fee: this.parseInput(this.chem_odd_development_fee),
                library_caution_fee: this.parseInput(this.chem_odd_library_caution_fee),
                transport_fee: this.parseInput(this.chem_odd_transport_fee),
                training_placement_fee: this.parseInput(this.chem_odd_training_placement_fee),
                college_festival_fee: this.parseInput(this.chem_odd_college_festival_fee),
                medical_fee: this.parseInput(this.chem_odd_medical_fee),
                late_fee: this.parseInput(this.chem_odd_late_fee),
                last_admission_date: this.convertDate(this.chem_odd_last_date),
                depertment_id: this.chem_odd_depertment_id,
                branch: this.chem_odd_branch_id,
                semester: "Odd"
              },
            })
            .then(response => {
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'Successfully Updated Fees.'
            })
            .catch(error => {
              this.errorOccure = true
              this.snackbar = true
              this.msg = 'Please fill the fields correctly.'
            })
          }
          else{
                axios({url: this.$store.state.odd_semester_fees_end_point, method: 'POST',
                headers: this.headers,
                data: {
                  govt_dues: this.parseInput(this.chem_odd_govt_dues),
                  tuition_fee: this.parseInput(this.chem_odd_tuition_fee),
                  identity_fee: this.parseInput(this.chem_odd_identity_fee),
                  examination_fee: this.parseInput(this.chem_odd_examination_fee),
                  student_union_fee: this.parseInput(this.chem_odd_student_union_fee),
                  game_sports_fee: this.parseInput(this.chem_odd_game_sports_fee),
                  magazine_fee: this.parseInput(this.chem_odd_magazine_fee),
                  laboratory_fee: this.parseInput(this.chem_odd_laboratory_fee),
                  university_registration_fee: this.parseInput(this.chem_odd_university_registration_fee),
                  enrolment_fee: this.parseInput(this.chem_odd_enrolment_fee),
                  electricity_fee: this.parseInput(this.chem_odd_electricity_fee),
                  group_insurance_fee: this.parseInput(this.chem_odd_group_insurance_fee),
                  scout_guide_fee: this.parseInput(this.chem_odd_scout_guide_fee),
                  internet_fee: this.parseInput(this.chem_odd_internet_fee),
                  welfare_fee: this.parseInput(this.chem_odd_welfare_fee),
                  development_fee: this.parseInput(this.chem_odd_development_fee),
                  library_caution_fee: this.parseInput(this.chem_odd_library_caution_fee),
                  transport_fee: this.parseInput(this.chem_odd_transport_fee),
                  training_placement_fee: this.parseInput(this.chem_odd_training_placement_fee),
                  college_festival_fee: this.parseInput(this.chem_odd_college_festival_fee),
                  medical_fee: this.parseInput(this.chem_odd_medical_fee),
                  late_fee: this.parseInput(this.chem_odd_late_fee),
                  last_admission_date: this.convertDate(this.chem_odd_last_date),
                  depertment_id: this.chem_odd_depertment_id,
                  branch: this.chem_odd_branch_id,
                  semester: "Odd"
                },
              })
              .then(response => {
                this.errorOccure = false
                this.snackbar = true
                this.msg = 'Successfully Updated Fees.'
              })
              .catch(error => {
                this.errorOccure = true
                this.snackbar = true
                this.msg = 'Please fill the fields correctly.'
              })
            }
          })
          this.isPageLoad = false
      })
    },
    chem_even_fee_update() {
      this.isPageLoad = true
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == 'Master of Science'){
              this.chem_even_depertment_id = response.data[i]['id']
            }
          }
          var branch = ['Chemistry']
          axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            for(var i = 0; i < response.data.length; i++){
              for(var j=0; j < branch.length; j++){
                if(response.data[i]['branch_name'] == branch[j]){
                  this.chem_even_branch_id.push(response.data[i]['id'])
                }
              }
            }

            if(this.is_chem_even_exist){
              axios({url: this.$store.state.odd_semester_fees_end_point +this.chem_even_table_id+'/', method: 'PUT',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.chem_even_govt_dues),
                tuition_fee: this.parseInput(this.chem_even_tuition_fee),
                examination_fee: this.parseInput(this.chem_even_examination_fee),
                laboratory_fee: this.parseInput(this.chem_even_laboratory_fee),
                enrolment_fee: this.parseInput(this.chem_even_enrolment_fee),
                internet_fee: this.parseInput(this.chem_even_internet_fee),
                development_fee: this.parseInput(this.chem_even_development_fee),
                transport_fee: this.parseInput(this.chem_even_transport_fee),
                college_festival_fee: this.parseInput(this.chem_even_college_festival_fee),
                medical_fee: this.parseInput(this.chem_even_medical_fee),
                late_fee: this.parseInput(this.chem_even_late_fee),
                last_admission_date: this.convertDate(this.chem_even_last_date),
                depertment_id: this.chem_even_depertment_id,
                branch: this.chem_even_branch_id,
                semester: "Even",
              },
            })
            .then(response => {
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'Successfully Updated Fees.'
            })
            .catch(error => {
              this.errorOccure = true
              this.snackbar = true
              this.msg = 'Please fill the fields correctly.'
            })
          }
          else{
                axios({url: this.$store.state.odd_semester_fees_end_point, method: 'POST',
                headers: this.headers,
                data: {
                  govt_dues: this.parseInput(this.chem_even_govt_dues),
                  tuition_fee: this.parseInput(this.chem_even_tuition_fee),
                  examination_fee: this.parseInput(this.chem_even_examination_fee),
                  laboratory_fee: this.parseInput(this.chem_even_laboratory_fee),
                  enrolment_fee: this.parseInput(this.chem_even_enrolment_fee),
                  internet_fee: this.parseInput(this.chem_even_internet_fee),
                  development_fee: this.parseInput(this.chem_even_development_fee),
                  transport_fee: this.parseInput(this.chem_even_transport_fee),
                  college_festival_fee: this.parseInput(this.chem_even_college_festival_fee),
                  medical_fee: this.parseInput(this.chem_even_medical_fee),
                  late_fee: this.parseInput(this.chem_even_late_fee),
                  last_admission_date: this.convertDate(this.chem_even_last_date),
                  depertment_id: this.chem_even_depertment_id,
                  branch: this.chem_even_branch_id,
                  semester: "Even",
                },
              })
              .then(response => {
                this.errorOccure = false
                this.snackbar = true
                this.msg = 'Successfully Updated Fees.'
              })
              .catch(error => {
                this.errorOccure = true
                this.snackbar = true
                this.msg = 'Please fill the fields correctly.'
              })
            }
          })
          this.isPageLoad = false
      })
    },

    phd_fee_update() {
      this.isPageLoad = true
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == 'PhD'){
              this.phd_depertment_id = response.data[i]['id']
            }
          }
          var branch = ['Physics','Chemistry','Mathematics']
          axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            for(var i = 0; i < response.data.length; i++){
              for(var j=0; j < branch.length; j++){
                if(response.data[i]['branch_name'] == branch[j]){
                  this.phd_branch_id.push(response.data[i]['id'])
                }
              }
            }
            if(this.is_phd_exist){
              axios({url: this.$store.state.odd_semester_fees_end_point +this.phd_table_id+'/', method: 'PUT',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.phd_govt_dues),
                tuition_fee: this.parseInput(this.phd_tuition_fee),
                identity_fee: this.parseInput(this.phd_identity_fee),
                examination_fee: this.parseInput(this.phd_examination_fee),
                student_union_fee: this.parseInput(this.phd_student_union_fee),
                game_sports_fee: this.parseInput(this.phd_game_sports_fee),
                magazine_fee: this.parseInput(this.phd_magazine_fee),
                laboratory_fee: this.parseInput(this.phd_laboratory_fee),
                university_registration_fee: this.parseInput(this.phd_university_registration_fee),
                enrolment_fee: this.parseInput(this.phd_enrolment_fee),
                electricity_fee: this.parseInput(this.phd_electricity_fee),
                group_insurance_fee: this.parseInput(this.phd_group_insurance_fee),
                scout_guide_fee: this.parseInput(this.phd_scout_guide_fee),
                internet_fee: this.parseInput(this.phd_internet_fee),
                welfare_fee: this.parseInput(this.phd_welfare_fee),
                development_fee: this.parseInput(this.phd_development_fee),
                library_caution_fee: this.parseInput(this.phd_library_caution_fee),
                transport_fee: this.parseInput(this.phd_transport_fee),
                training_placement_fee: this.parseInput(this.phd_training_placement_fee),
                college_festival_fee: this.parseInput(this.phd_college_festival_fee),
                medical_fee: this.parseInput(this.phd_medical_fee),
                late_fee: this.parseInput(this.phd_late_fee),
                last_admission_date: this.convertDate(this.phd_last_date),
                depertment_id: this.phd_depertment_id,
                branch: this.phd_branch_id,
              },
            })
            .then(response => {
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'Successfully Updated Fees.'
            })
            .catch(error => {
              this.errorOccure = true
              this.snackbar = true
              this.msg = 'Please fill the fields correctly.'
            })
          }
          else{
            axios({url: this.$store.state.odd_semester_fees_end_point, method: 'POST',
            headers: this.headers,
            data: {
              govt_dues: this.parseInput(this.phd_govt_dues),
              tuition_fee: this.parseInput(this.phd_tuition_fee),
              identity_fee: this.parseInput(this.phd_identity_fee),
              examination_fee: this.parseInput(this.phd_examination_fee),
              student_union_fee: this.parseInput(this.phd_student_union_fee),
              game_sports_fee: this.parseInput(this.phd_game_sports_fee),
              magazine_fee: this.parseInput(this.phd_magazine_fee),
              laboratory_fee: this.parseInput(this.phd_laboratory_fee),
              university_registration_fee: this.parseInput(this.phd_university_registration_fee),
              enrolment_fee: this.parseInput(this.phd_enrolment_fee),
              electricity_fee: this.parseInput(this.phd_electricity_fee),
              group_insurance_fee: this.parseInput(this.phd_group_insurance_fee),
              scout_guide_fee: this.parseInput(this.phd_scout_guide_fee),
              internet_fee: this.parseInput(this.phd_internet_fee),
              welfare_fee: this.parseInput(this.phd_welfare_fee),
              development_fee: this.parseInput(this.phd_development_fee),
              library_caution_fee: this.parseInput(this.phd_library_caution_fee),
              transport_fee: this.parseInput(this.phd_transport_fee),
              training_placement_fee: this.parseInput(this.phd_training_placement_fee),
              college_festival_fee: this.parseInput(this.phd_college_festival_fee),
              medical_fee: this.parseInput(this.phd_medical_fee),
              late_fee: this.parseInput(this.phd_late_fee),
              last_admission_date: this.convertDate(this.phd_last_date),
              depertment_id: this.phd_depertment_id,
              branch: this.phd_branch_id,
              // semester: "NULL"
            },
          })
          .then(response => {
            this.errorOccure = false
            this.snackbar = true
            this.msg = 'Successfully Updated Fees.'
          })
          .catch(error => {
            this.errorOccure = true
            this.snackbar = true
            this.msg = 'Please fill the fields correctly.'
          })
        }
          })
          this.isPageLoad = false
      })
    },

    get_depertment_id(depertment){
      var id = ''
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == depertment){
              id = response.data[i]['id']
            }
          }
          return id
      })
    },

    get_fee_data(depertment) {
      for(var i=0; i<this.fee_data.length; i++){
        if(this.fee_data[i]['depertment']==depertment && this.fee_data[i]['semester']=="NULL"){
          if(depertment=='PhD') {
            this.is_phd_exist = true
            this.phd_table_id = this.fee_data[i]['id']
            this.phd_depertment_id = this.fee_data[i]['depertment_id']
            this.phd_govt_dues = this.fee_data[i]['govt_dues']
            this.phd_tuition_fee = this.fee_data[i]['tuition_fee']
            this.phd_identity_fee = this.fee_data[i]['identity_fee']
            this.phd_examination_fee = this.fee_data[i]['examination_fee']
            this.phd_student_union_fee = this.fee_data[i]['student_union_fee']
            this.phd_game_sports_fee = this.fee_data[i]['game_sports_fee']
            this.phd_magazine_fee = this.fee_data[i]['magazine_fee']
            this.phd_laboratory_fee = this.fee_data[i]['laboratory_fee']
            this.phd_university_registration_fee = this.fee_data[i]['university_registration_fee']
            this.phd_enrolment_fee = this.fee_data[i]['enrolment_fee']
            this.phd_electricity_fee = this.fee_data[i]['electricity_fee']
            this.phd_group_insurance_fee = this.fee_data[i]['group_insurance_fee']
            this.phd_scout_guide_fee = this.fee_data[i]['scout_guide_fee']
            this.phd_internet_fee = this.fee_data[i]['internet_fee']
            this.phd_welfare_fee = this.fee_data[i]['welfare_fee']
            this.phd_development_fee = this.fee_data[i]['development_fee']
            this.phd_library_caution_fee = this.fee_data[i]['library_caution_fee']
            this.phd_transport_fee = this.fee_data[i]['transport_fee']
            this.phd_training_placement_fee = this.fee_data[i]['training_placement_fee']
            this.phd_college_festival_fee = this.fee_data[i]['college_festival_fee']
            this.phd_medical_fee = this.fee_data[i]['medical_fee']
            this.phd_late_fee = this.fee_data[i]['late_fee']
            this.phd_last_date = this.formatDate(this.fee_data[i]['last_admission_date'])
          }
        }


        if(this.fee_data[i]['depertment']==depertment && this.fee_data[i]['semester']=="Odd"){

          if(depertment=='Bachelor of Science'){
            // this.is_bsc_data_loaded = true
            this.is_bsc_odd_exist = true
            this.bsc_odd_table_id = this.fee_data[i]['id']
            this.bsc_odd_depertment_id = this.fee_data[i]['depertment_id']
            this.bsc_odd_govt_dues = this.fee_data[i]['govt_dues']
            this.bsc_odd_tuition_fee = this.fee_data[i]['tuition_fee']
            this.bsc_odd_identity_fee = this.fee_data[i]['identity_fee']
            this.bsc_odd_examination_fee = this.fee_data[i]['examination_fee']
            this.bsc_odd_student_union_fee = this.fee_data[i]['student_union_fee']
            this.bsc_odd_game_sports_fee = this.fee_data[i]['game_sports_fee']
            this.bsc_odd_magazine_fee = this.fee_data[i]['magazine_fee']
            this.bsc_odd_laboratory_fee = this.fee_data[i]['laboratory_fee']
            this.bsc_odd_university_registration_fee = this.fee_data[i]['university_registration_fee']
            this.bsc_odd_enrolment_fee = this.fee_data[i]['enrolment_fee']
            this.bsc_odd_electricity_fee = this.fee_data[i]['electricity_fee']
            this.bsc_odd_group_insurance_fee = this.fee_data[i]['group_insurance_fee']
            this.bsc_odd_scout_guide_fee = this.fee_data[i]['scout_guide_fee']
            this.bsc_odd_internet_fee = this.fee_data[i]['internet_fee']
            this.bsc_odd_welfare_fee = this.fee_data[i]['welfare_fee']
            this.bsc_odd_development_fee = this.fee_data[i]['development_fee']
            this.bsc_odd_library_caution_fee = this.fee_data[i]['library_caution_fee']
            this.bsc_odd_transport_fee = this.fee_data[i]['transport_fee']
            this.bsc_odd_training_placement_fee = this.fee_data[i]['training_placement_fee']
            this.bsc_odd_college_festival_fee = this.fee_data[i]['college_festival_fee']
            this.bsc_odd_medical_fee = this.fee_data[i]['medical_fee']
            this.bsc_odd_late_fee = this.fee_data[i]['late_fee']
            this.bsc_odd_last_date = this.formatDate(this.fee_data[i]['last_admission_date'])
            // this.bsc_odd_last_date = this.parseDate(this.fee_data[i]['last_admission_date'])
          }

          if(depertment=='Bachelor of Science in Information Technology'){
            this.is_it_odd_exist = true
            this.it_odd_table_id = this.fee_data[i]['id']
            this.it_odd_depertment_id = this.fee_data[i]['depertment_id']
            this.it_odd_govt_dues = this.fee_data[i]['govt_dues']
            this.it_odd_tuition_fee = this.fee_data[i]['tuition_fee']
            this.it_odd_identity_fee = this.fee_data[i]['identity_fee']
            this.it_odd_examination_fee = this.fee_data[i]['examination_fee']
            this.it_odd_student_union_fee = this.fee_data[i]['student_union_fee']
            this.it_odd_game_sports_fee = this.fee_data[i]['game_sports_fee']
            this.it_odd_magazine_fee = this.fee_data[i]['magazine_fee']
            this.it_odd_laboratory_fee = this.fee_data[i]['laboratory_fee']
            this.it_odd_university_registration_fee = this.fee_data[i]['university_registration_fee']
            this.it_odd_enrolment_fee = this.fee_data[i]['enrolment_fee']
            this.it_odd_electricity_fee = this.fee_data[i]['electricity_fee']
            this.it_odd_group_insurance_fee = this.fee_data[i]['group_insurance_fee']
            this.it_odd_scout_guide_fee = this.fee_data[i]['scout_guide_fee']
            this.it_odd_internet_fee = this.fee_data[i]['internet_fee']
            this.it_odd_welfare_fee = this.fee_data[i]['welfare_fee']
            this.it_odd_development_fee = this.fee_data[i]['development_fee']
            this.it_odd_library_caution_fee = this.fee_data[i]['library_caution_fee']
            this.it_odd_transport_fee = this.fee_data[i]['transport_fee']
            this.it_odd_training_placement_fee = this.fee_data[i]['training_placement_fee']
            this.it_odd_college_festival_fee = this.fee_data[i]['college_festival_fee']
            this.it_odd_medical_fee = this.fee_data[i]['medical_fee']
            this.it_odd_late_fee = this.fee_data[i]['late_fee']
            this.it_odd_last_date = this.formatDate(this.fee_data[i]['last_admission_date'])
          }

          if(depertment=='Master of Science' && this.fee_data[i]['branch'].length>1){
            // console.log("***",this.fee_data[i]['branch'].length);
            this.is_msc_odd_exist = true
            console.log("is_msc_odd_exist",this.is_msc_odd_exist);
            this.msc_odd_table_id = this.fee_data[i]['id']
            this.msc_odd_depertment_id = this.fee_data[i]['depertment_id']
            this.msc_odd_govt_dues = this.fee_data[i]['govt_dues']
            this.msc_odd_tuition_fee = this.fee_data[i]['tuition_fee']
            this.msc_odd_identity_fee = this.fee_data[i]['identity_fee']
            this.msc_odd_examination_fee = this.fee_data[i]['examination_fee']
            this.msc_odd_student_union_fee = this.fee_data[i]['student_union_fee']
            this.msc_odd_game_sports_fee = this.fee_data[i]['game_sports_fee']
            this.msc_odd_magazine_fee = this.fee_data[i]['magazine_fee']
            this.msc_odd_laboratory_fee = this.fee_data[i]['laboratory_fee']
            this.msc_odd_university_registration_fee = this.fee_data[i]['university_registration_fee']
            this.msc_odd_enrolment_fee = this.fee_data[i]['enrolment_fee']
            this.msc_odd_electricity_fee = this.fee_data[i]['electricity_fee']
            this.msc_odd_group_insurance_fee = this.fee_data[i]['group_insurance_fee']
            this.msc_odd_scout_guide_fee = this.fee_data[i]['scout_guide_fee']
            this.msc_odd_internet_fee = this.fee_data[i]['internet_fee']
            this.msc_odd_welfare_fee = this.fee_data[i]['welfare_fee']
            this.msc_odd_development_fee = this.fee_data[i]['development_fee']
            this.msc_odd_library_caution_fee = this.fee_data[i]['library_caution_fee']
            this.msc_odd_transport_fee = this.fee_data[i]['transport_fee']
            this.msc_odd_training_placement_fee = this.fee_data[i]['training_placement_fee']
            this.msc_odd_college_festival_fee = this.fee_data[i]['college_festival_fee']
            this.msc_odd_medical_fee = this.fee_data[i]['medical_fee']
            this.msc_odd_late_fee = this.fee_data[i]['late_fee']
            this.msc_odd_last_date = this.formatDate(this.fee_data[i]['last_admission_date'])
          }


          if(depertment=='Master of Science' && this.fee_data[i]['branch'][0]==this.chem_id && this.fee_data[i]['branch'].length==1){
            // this.is_bsc_data_loaded = true
            this.is_chem_odd_exist = true
            this.chem_odd_table_id = this.fee_data[i]['id']
            this.chem_odd_depertment_id = this.fee_data[i]['depertment_id']
            this.chem_odd_govt_dues = this.fee_data[i]['govt_dues']
            this.chem_odd_tuition_fee = this.fee_data[i]['tuition_fee']
            this.chem_odd_identity_fee = this.fee_data[i]['identity_fee']
            this.chem_odd_examination_fee = this.fee_data[i]['examination_fee']
            this.chem_odd_student_union_fee = this.fee_data[i]['student_union_fee']
            this.chem_odd_game_sports_fee = this.fee_data[i]['game_sports_fee']
            this.chem_odd_magazine_fee = this.fee_data[i]['magazine_fee']
            this.chem_odd_laboratory_fee = this.fee_data[i]['laboratory_fee']
            this.chem_odd_university_registration_fee = this.fee_data[i]['university_registration_fee']
            this.chem_odd_enrolment_fee = this.fee_data[i]['enrolment_fee']
            this.chem_odd_electricity_fee = this.fee_data[i]['electricity_fee']
            this.chem_odd_group_insurance_fee = this.fee_data[i]['group_insurance_fee']
            this.chem_odd_scout_guide_fee = this.fee_data[i]['scout_guide_fee']
            this.chem_odd_internet_fee = this.fee_data[i]['internet_fee']
            this.chem_odd_welfare_fee = this.fee_data[i]['welfare_fee']
            this.chem_odd_development_fee = this.fee_data[i]['development_fee']
            this.chem_odd_library_caution_fee = this.fee_data[i]['library_caution_fee']
            this.chem_odd_transport_fee = this.fee_data[i]['transport_fee']
            this.chem_odd_training_placement_fee = this.fee_data[i]['training_placement_fee']
            this.chem_odd_college_festival_fee = this.fee_data[i]['college_festival_fee']
            this.chem_odd_medical_fee = this.fee_data[i]['medical_fee']
            this.chem_odd_late_fee = this.fee_data[i]['late_fee']
            this.chem_odd_last_date = this.formatDate(this.fee_data[i]['last_admission_date'])
          }
        }

        if(this.fee_data[i]['depertment']==depertment && this.fee_data[i]['semester']=="Even"){
          if(depertment=='Bachelor of Science'){
            // this.is_bsc_data_loaded = true
            this.is_bsc_even_exist = true
            this.bsc_even_table_id = this.fee_data[i]['id']
            this.bsc_even_depertment_id = this.fee_data[i]['depertment_id']
            this.bsc_even_govt_dues = this.fee_data[i]['govt_dues']
            this.bsc_even_tuition_fee = this.fee_data[i]['tuition_fee']
            this.bsc_even_examination_fee = this.fee_data[i]['examination_fee']
            this.bsc_even_laboratory_fee = this.fee_data[i]['laboratory_fee']
            this.bsc_even_enrolment_fee = this.fee_data[i]['enrolment_fee']
            this.bsc_even_internet_fee = this.fee_data[i]['internet_fee']
            this.bsc_even_development_fee = this.fee_data[i]['development_fee']
            this.bsc_even_transport_fee = this.fee_data[i]['transport_fee']
            this.bsc_even_medical_fee = this.fee_data[i]['medical_fee']
            this.bsc_even_late_fee = this.fee_data[i]['late_fee']
            this.bsc_even_last_date = this.formatDate(this.fee_data[i]['last_admission_date'])
          }

          if(depertment=='Bachelor of Science in Information Technology'){
            this.is_it_even_exist = true
            this.it_even_table_id = this.fee_data[i]['id']
            this.it_even_depertment_id = this.fee_data[i]['depertment_id']
            this.it_even_govt_dues = this.fee_data[i]['govt_dues']
            this.it_even_tuition_fee = this.fee_data[i]['tuition_fee']
            this.it_even_examination_fee = this.fee_data[i]['examination_fee']
            this.it_even_laboratory_fee = this.fee_data[i]['laboratory_fee']
            this.it_even_enrolment_fee = this.fee_data[i]['enrolment_fee']
            this.it_even_internet_fee = this.fee_data[i]['internet_fee']
            this.it_even_development_fee = this.fee_data[i]['development_fee']
            this.it_even_transport_fee = this.fee_data[i]['transport_fee']
            this.it_even_college_festival_fee = this.fee_data[i]['college_festival_fee']
            this.it_even_late_fee = this.fee_data[i]['late_fee']
            this.it_even_last_date = this.formatDate(this.fee_data[i]['last_admission_date'])
          }

          if(depertment=='Master of Science' && this.fee_data[i]['branch'].length>1){
            this.is_msc_even_exist = true
            console.log("is_msc_even_exis",this.is_msc_even_exist);
            this.msc_even_table_id = this.fee_data[i]['id']
            this.msc_even_depertment_id = this.fee_data[i]['depertment_id']
            this.msc_even_govt_dues = this.fee_data[i]['govt_dues']
            this.msc_even_tuition_fee = this.fee_data[i]['tuition_fee']
            this.msc_even_examination_fee = this.fee_data[i]['examination_fee']
            this.msc_even_laboratory_fee = this.fee_data[i]['laboratory_fee']
            this.msc_even_enrolment_fee = this.fee_data[i]['enrolment_fee']
            this.msc_even_internet_fee = this.fee_data[i]['internet_fee']
            this.msc_even_development_fee = this.fee_data[i]['development_fee']
            this.msc_even_transport_fee = this.fee_data[i]['transport_fee']
            this.msc_even_college_festival_fee = this.fee_data[i]['college_festival_fee']
            this.msc_even_medical_fee = this.fee_data[i]['medical_fee']
            this.msc_even_late_fee = this.fee_data[i]['late_fee']
            this.msc_even_last_date = this.formatDate(this.fee_data[i]['last_admission_date'])
          }

          if(depertment=='Master of Science' && this.fee_data[i]['branch'][0]==this.chem_id && this.fee_data[i]['branch'].length==1){
            // this.is_bsc_data_loaded = true
            this.is_chem_even_exist = true
            this.chem_even_table_id = this.fee_data[i]['id']
            this.chem_even_depertment_id = this.fee_data[i]['depertment_id']
            this.chem_even_govt_dues = this.fee_data[i]['govt_dues']
            this.chem_even_tuition_fee = this.fee_data[i]['tuition_fee']
            this.chem_even_examination_fee = this.fee_data[i]['examination_fee']
            this.chem_even_laboratory_fee = this.fee_data[i]['laboratory_fee']
            this.chem_even_enrolment_fee = this.fee_data[i]['enrolment_fee']
            this.chem_even_internet_fee = this.fee_data[i]['internet_fee']
            this.chem_even_development_fee = this.fee_data[i]['development_fee']
            this.chem_even_transport_fee = this.fee_data[i]['transport_fee']
            this.chem_even_college_festival_fee = this.fee_data[i]['college_festival_fee']
            this.chem_even_medical_fee = this.fee_data[i]['medical_fee']
            this.chem_even_late_fee = this.fee_data[i]['late_fee']
            this.chem_even_last_date = this.formatDate(this.fee_data[i]['last_admission_date'])
          }
        }
      }
      // this.isPageLoad = false
    },
    get_be_fee_data(depertment) {
      // console.log(this.be_fee_data);
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(() => {
        for(var i=0; i<this.be_fee_data.length; i++){
          if(this.be_fee_data[i]['depertment']==depertment && this.be_fee_data[i]['semester']=="Odd"){

            if(depertment=='Bachelor of Engineering'){
              // this.is_bsc_data_loaded = true
              this.is_be_odd_exist = true
              this.be_odd_table_id = this.be_fee_data[i]['id']
              this.be_odd_depertment_id = this.be_fee_data[i]['depertment_id']
              this.be_odd_govt_dues = this.be_fee_data[i]['govt_dues']
              this.be_odd_identity_fee = this.be_fee_data[i]['identity_fee']
              this.be_odd_examination_fee = this.be_fee_data[i]['examination_fee']
              this.be_odd_student_union_fee = this.be_fee_data[i]['student_union_fee']
              this.be_odd_game_sports_fee = this.be_fee_data[i]['game_sports_fee']
              this.be_odd_magazine_fee = this.be_fee_data[i]['magazine_fee']
              this.be_odd_laboratory_fee = this.be_fee_data[i]['laboratory_fee']
              this.be_odd_university_registration_fee = this.be_fee_data[i]['university_registration_fee']
              this.be_odd_enrolment_fee = this.be_fee_data[i]['enrolment_fee']
              this.be_odd_electricity_fee = this.be_fee_data[i]['electricity_fee']
              this.be_odd_group_insurance_fee = this.be_fee_data[i]['group_insurance_fee']
              this.be_odd_scout_guide_fee = this.be_fee_data[i]['scout_guide_fee']
              this.be_odd_internet_fee = this.be_fee_data[i]['internet_fee']
              this.be_odd_welfare_fee = this.be_fee_data[i]['welfare_fee']
              this.be_odd_development_fee = this.be_fee_data[i]['development_fee']
              this.be_odd_library_caution_fee = this.be_fee_data[i]['library_caution_fee']
              this.be_odd_transport_fee = this.be_fee_data[i]['transport_fee']
              this.be_odd_iste_fee = this.be_fee_data[i]['iste_fee']
              this.be_odd_training_placement_fee = this.be_fee_data[i]['training_placement_fee']
              this.be_odd_college_festival_fee = this.be_fee_data[i]['college_festival_fee']
              this.be_odd_medical_fee = this.be_fee_data[i]['medical_fee']
              this.be_odd_late_fee = this.be_fee_data[i]['late_fee']
              this.be_odd_last_date = this.formatDate(this.be_fee_data[i]['last_admission_date'])
            }
          }

          if(this.be_fee_data[i]['depertment']==depertment && this.be_fee_data[i]['semester']=="Even"){
            if(depertment=='Bachelor of Engineering'){
              this.is_be_even_exist = true
              this.be_even_table_id = this.be_fee_data[i]['id']
              this.be_even_depertment_id = this.be_fee_data[i]['depertment_id']
              this.be_even_govt_dues = this.be_fee_data[i]['govt_dues']
              this.be_even_examination_fee = this.be_fee_data[i]['examination_fee']
              this.be_even_laboratory_fee = this.be_fee_data[i]['laboratory_fee']
              this.be_even_enrolment_fee = this.be_fee_data[i]['enrolment_fee']
              this.be_even_internet_fee = this.be_fee_data[i]['internet_fee']
              this.be_even_development_fee = this.be_fee_data[i]['development_fee']
              this.be_even_transport_fee = this.be_fee_data[i]['transport_fee']
              this.be_even_medical_fee = this.be_fee_data[i]['medical_fee']
              this.be_even_late_fee = this.be_fee_data[i]['late_fee']
              this.be_even_last_date = this.formatDate(this.be_fee_data[i]['last_admission_date'])
            }
          }
        }
        this.isPageLoad = false
      })
    },

    bsc_odd_reset() {
      this.bsc_odd_govt_dues = ''
      this.bsc_odd_tuition_fee = ''
      this.bsc_odd_identity_fee = ''
      this.bsc_odd_examination_fee = ''
      this.bsc_odd_student_union_fee = ''
      this.bsc_odd_game_sports_fee = ''
      this.bsc_odd_magazine_fee = ''
      this.bsc_odd_laboratory_fee = ''
      this.bsc_odd_university_registration_fee = ''
      this.bsc_odd_enrolment_fee = ''
      this.bsc_odd_electricity_fee = ''
      this.bsc_odd_group_insurance_fee = ''
      this.bsc_odd_scout_guide_fee = ''
      this.bsc_odd_internet_fee = ''
      this.bsc_odd_welfare_fee = ''
      this.bsc_odd_development_fee = ''
      this.bsc_odd_library_caution_fee = ''
      this.bsc_odd_transport_fee = ''
      this.bsc_odd_training_placement_fee = ''
      this.bsc_odd_college_festival_fee = ''
      this.bsc_odd_medical_fee = ''
      this.bsc_odd_late_fee = ''
      this.bsc_odd_last_date = ''
    },
    bsc_even_reset() {
      this.bsc_even_govt_dues = ''
      this.bsc_even_tuition_fee = ''
      this.bsc_even_examination_fee = ''
      this.bsc_even_laboratory_fee = ''
      this.bsc_even_enrolment_fee = ''
      this.bsc_even_internet_fee = ''
      this.bsc_even_development_fee = ''
      this.bsc_even_transport_fee = ''
      this.bsc_even_college_festival_fee = ''
      this.bsc_even_medical_fee = ''
      this.bsc_even_late_fee = ''
      this.bsc_even_last_date = ''
    },
    it_odd_reset() {
      this.it_odd_govt_dues = ''
      this.it_odd_tuition_fee = ''
      this.it_odd_identity_fee = ''
      this.it_odd_examination_fee = ''
      this.it_odd_student_union_fee = ''
      this.it_odd_game_sports_fee = ''
      this.it_odd_magazine_fee = ''
      this.it_odd_laboratory_fee = ''
      this.it_odd_university_registration_fee = ''
      this.it_odd_enrolment_fee = ''
      this.it_odd_electricity_fee = ''
      this.it_odd_group_insurance_fee = ''
      this.it_odd_scout_guide_fee = ''
      this.it_odd_internet_fee = ''
      this.it_odd_welfare_fee = ''
      this.it_odd_development_fee = ''
      this.it_odd_library_caution_fee = ''
      this.it_odd_transport_fee = ''
      this.it_odd_training_placement_fee = ''
      this.it_odd_college_festival_fee = ''
      this.it_odd_medical_fee = ''
      this.it_odd_late_fee = ''
      this.it_odd_last_date = ''
    },
    it_even_reset() {
      this.it_even_govt_dues = ''
      this.it_even_tuition_fee = ''
      this.it_even_examination_fee = ''
      this.it_even_laboratory_fee = ''
      this.it_even_enrolment_fee = ''
      this.it_even_internet_fee = ''
      this.it_even_development_fee = ''
      this.it_even_transport_fee = ''
      this.it_even_college_festival_fee = ''
      this.it_even_medical_fee = ''
      this.it_even_late_fee = ''
      this.it_even_last_date = ''
    },
    be_odd_reset() {
      this.be_odd_govt_dues = ''
      this.be_odd_identity_fee = ''
      this.be_odd_examination_fee = ''
      this.be_odd_student_union_fee = ''
      this.be_odd_game_sports_fee = ''
      this.be_odd_magazine_fee = ''
      this.be_odd_laboratory_fee = ''
      this.be_odd_university_registration_fee = ''
      this.be_odd_enrolment_fee = ''
      this.be_odd_electricity_fee = ''
      this.be_odd_group_insurance_fee = ''
      this.be_odd_scout_guide_fee = ''
      this.be_odd_internet_fee = ''
      this.be_odd_welfare_fee = ''
      this.be_odd_development_fee = ''
      this.be_odd_library_caution_fee = ''
      this.be_odd_transport_fee = ''
      this.be_odd_iste_fee = ''
      this.be_odd_training_placement_fee = ''
      this.be_odd_college_festival_fee = ''
      this.be_odd_medical_fee = ''
      this.be_odd_late_fee = ''
      this.be_odd_last_date = ''
    },
    be_even_reset() {
      this.be_even_govt_dues = ''
      this.be_even_examination_fee = ''
      this.be_even_laboratory_fee = ''
      this.be_even_enrolment_fee = ''
      this.be_even_internet_fee = ''
      this.be_even_development_fee = ''
      this.be_even_transport_fee = ''
      this.be_even_college_festival_fee = ''
      this.be_even_medical_fee = ''
      this.be_even_late_fee = ''
      this.be_even_last_date = ''
    },
    msc_odd_reset() {
      this.msc_odd_govt_dues = ''
      this.msc_odd_tuition_fee = ''
      this.msc_odd_identity_fee = ''
      this.msc_odd_examination_fee = ''
      this.msc_odd_student_union_fee = ''
      this.msc_odd_game_sports_fee = ''
      this.msc_odd_magazine_fee = ''
      this.msc_odd_laboratory_fee = ''
      this.msc_odd_university_registration_fee = ''
      this.msc_odd_enrolment_fee = ''
      this.msc_odd_electricity_fee = ''
      this.msc_odd_group_insurance_fee = ''
      this.msc_odd_scout_guide_fee = ''
      this.msc_odd_internet_fee = ''
      this.msc_odd_welfare_fee = ''
      this.msc_odd_development_fee = ''
      this.msc_odd_library_caution_fee = ''
      this.msc_odd_transport_fee = ''
      this.msc_odd_training_placement_fee = ''
      this.msc_odd_college_festival_fee = ''
      this.msc_odd_medical_fee = ''
      this.msc_odd_late_fee = ''
      this.msc_odd_last_date = ''
    },
    msc_even_reset() {
      this.msc_even_govt_dues = ''
      this.msc_even_tuition_fee = ''
      this.msc_even_examination_fee = ''
      this.msc_even_laboratory_fee = ''
      this.msc_even_enrolment_fee = ''
      this.msc_even_internet_fee = ''
      this.msc_even_development_fee = ''
      this.msc_even_transport_fee = ''
      this.msc_even_college_festival_fee = ''
      this.msc_even_medical_fee = ''
      this.msc_even_late_fee = ''
      this.msc_even_last_date = ''
    },
    chem_odd_reset() {
      this.chem_odd_govt_dues = ''
      this.chem_odd_tuition_fee = ''
      this.chem_odd_identity_fee = ''
      this.chem_odd_examination_fee = ''
      this.chem_odd_student_union_fee = ''
      this.chem_odd_game_sports_fee = ''
      this.chem_odd_magazine_fee = ''
      this.chem_odd_laboratory_fee = ''
      this.chem_odd_university_registration_fee = ''
      this.chem_odd_enrolment_fee = ''
      this.chem_odd_electricity_fee = ''
      this.chem_odd_group_insurance_fee = ''
      this.chem_odd_scout_guide_fee = ''
      this.chem_odd_internet_fee = ''
      this.chem_odd_welfare_fee = ''
      this.chem_odd_development_fee = ''
      this.chem_odd_library_caution_fee = ''
      this.chem_odd_transport_fee = ''
      this.chem_odd_training_placement_fee = ''
      this.chem_odd_college_festival_fee = ''
      this.chem_odd_medical_fee = ''
      this.chem_odd_late_fee = ''
      this.chem_odd_last_date = ''
    },
    chem_even_reset() {
      this.chem_even_govt_dues = ''
      this.chem_even_tuition_fee = ''
      this.chem_even_examination_fee = ''
      this.chem_even_laboratory_fee = ''
      this.chem_even_enrolment_fee = ''
      this.chem_even_internet_fee = ''
      this.chem_even_development_fee = ''
      this.chem_even_transport_fee = ''
      this.chem_even_college_festival_fee = ''
      this.chem_even_medical_fee = ''
      this.chem_even_late_fee = ''
      this.chem_even_last_date = ''
    },
    phd_reset() {
      this.phd_govt_dues = ''
      this.phd_tuition_fee = ''
      this.phd_identity_fee = ''
      this.phd_examination_fee = ''
      this.phd_student_union_fee = ''
      this.phd_game_sports_fee = ''
      this.phd_magazine_fee = ''
      this.phd_laboratory_fee = ''
      this.phd_university_registration_fee = ''
      this.phd_enrolment_fee = ''
      this.phd_electricity_fee = ''
      this.phd_group_insurance_fee = ''
      this.phd_scout_guide_fee = ''
      this.phd_internet_fee = ''
      this.phd_welfare_fee = ''
      this.phd_development_fee = ''
      this.phd_library_caution_fee = ''
      this.phd_transport_fee = ''
      this.phd_training_placement_fee = ''
      this.phd_college_festival_fee = ''
      this.phd_medical_fee = ''
      this.phd_late_fee = ''
      this.phd_last_date = ''
    },
  }
}
</script>

<style lang="css" scoped>
.semester_border.v-tab {
  border: 1px solid black;
  border-radius: 50px;
  margin-left: 2px;
  margin-right: 2px;
}
.semester_border.v-tab--active {
  border-color: #1976d2;
}
</style>
