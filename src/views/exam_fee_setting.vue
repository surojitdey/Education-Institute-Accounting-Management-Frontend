<template>
  <div class="exam_fee">
    <v-card fluid>
      <v-card-title class="text-uppercase text-center">
        <span class="text-center">
          Examination Fee Setting
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
      <!-- <v-tab href="#chem">Master of Science in Chemistry</v-tab>
      <v-tab href="#phd">PhD</v-tab> -->

      <v-tab-item value="bsc">
        <v-card flat>
          <v-tabs v-model="semester_tab" light class="elevation-0" centered center-active>
            <v-tabs-slider v-show="false"></v-tabs-slider>
            <v-tab href="#odd" class="semester_border">odd semester</v-tab>
            <v-tab href="#even" class="semester_border">even semester</v-tab>
            <v-tab-item value="odd">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Examination Fee" v-model="bsc_odd_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>Without Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="One Subject" v-model="bsc_odd_compartmental_exam_fee_no_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Two or More Subjects" v-model="bsc_odd_compartmental_exam_fee_no_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>With Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="Practicle With One Subject" v-model="bsc_odd_compartmental_exam_fee_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Practical With Two or More Subjects" v-model="bsc_odd_compartmental_exam_fee_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_one" placeholder="One Subject" v-model="bsc_odd_betterment_exam_fee_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_more" placeholder="Two or More Subjects" v-model="bsc_odd_betterment_exam_fee_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Non-College Fee" v-model="bsc_odd_non_college_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Late Fine" v-model="bsc_odd_late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
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
                  <v-btn type="submit" color="success darken-1" width="115" @click="exam_fee_update('Bachelor of Science','Odd')">Save</v-btn>

                  <v-btn color="error darken-1" width="115" @click="reset('Bachelor of Science','Odd')">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item value="even">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Examination Fee" v-model="bsc_even_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>Without Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="One Subject" v-model="bsc_even_compartmental_exam_fee_no_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Two or More Subjects" v-model="bsc_even_compartmental_exam_fee_no_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>With Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="Practicle With One Subject" v-model="bsc_even_compartmental_exam_fee_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Practical With Two or More Subjects" v-model="bsc_even_compartmental_exam_fee_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_one" placeholder="One Subject" v-model="bsc_even_betterment_exam_fee_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_more" placeholder="Two or More Subjects" v-model="bsc_even_betterment_exam_fee_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Non-College Fee" v-model="bsc_even_non_college_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
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
                  <v-btn type="submit" color="success darken-1" width="115" @click="exam_fee_update('Bachelor of Science','Even')">Save</v-btn>
                  <v-btn color="error darken-1" width="115" @click="reset('Bachelor of Science','Even')">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-tab-item>


      <v-tab-item value="it">
        <v-card flat>
          <v-tabs v-model="semester_tab" light class="elevation-0" centered center-active>
            <v-tabs-slider v-show="false"></v-tabs-slider>
            <v-tab href="#odd" class="semester_border">odd semester</v-tab>
            <v-tab href="#even" class="semester_border">even semester</v-tab>
            <v-tab-item value="odd">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Examination Fee" v-model="it_odd_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>Without Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="One Subject" v-model="it_odd_compartmental_exam_fee_no_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Two or More Subjects" v-model="it_odd_compartmental_exam_fee_no_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>With Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="Practicle With One Subject" v-model="it_odd_compartmental_exam_fee_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Practical With Two or More Subjects" v-model="it_odd_compartmental_exam_fee_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_one" placeholder="One Subject" v-model="it_odd_betterment_exam_fee_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_more" placeholder="Two or More Subjects" v-model="it_odd_betterment_exam_fee_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Non-College Fee" v-model="it_odd_non_college_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
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
                  <v-btn type="submit" color="success darken-1" width="115" @click="exam_fee_update('Bachelor of Science in Information Technology','Odd')">Save</v-btn>

                  <v-btn color="error darken-1" width="115" @click="reset('Bachelor of Science in Information Technology','Odd')">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item value="even">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Examination Fee" v-model="it_even_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>Without Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="One Subject" v-model="it_even_compartmental_exam_fee_no_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Two or More Subjects" v-model="it_even_compartmental_exam_fee_no_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>With Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="Practicle With One Subject" v-model="it_even_compartmental_exam_fee_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Practical With Two or More Subjects" v-model="it_even_compartmental_exam_fee_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_one" placeholder="One Subject" v-model="it_even_betterment_exam_fee_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_more" placeholder="Two or More Subjects" v-model="it_even_betterment_exam_fee_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Non-College Fee" v-model="it_even_non_college_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
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
                  <v-btn type="submit" color="success darken-1" width="115" @click="exam_fee_update('Bachelor of Science in Information Technology','Even')">Save</v-btn>
                  <v-btn color="error darken-1" width="115" @click="reset('Bachelor of Science in Information Technology','Even')">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-tab-item>

      <v-tab-item value="be">
        <v-card flat>
          <v-tabs v-model="semester_tab" light class="elevation-0" centered center-active>
            <v-tabs-slider v-show="false"></v-tabs-slider>
            <v-tab href="#odd" class="semester_border">odd semester</v-tab>
            <v-tab href="#even" class="semester_border">even semester</v-tab>
            <v-tab-item value="odd">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Examination Fee" v-model="be_odd_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>Without Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="One Subject" v-model="be_odd_compartmental_exam_fee_no_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Two or More Subjects" v-model="be_odd_compartmental_exam_fee_no_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>With Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="Practicle With One Subject" v-model="be_odd_compartmental_exam_fee_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Practical With Two or More Subjects" v-model="be_odd_compartmental_exam_fee_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_one" placeholder="One Subject" v-model="be_odd_betterment_exam_fee_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_more" placeholder="Two or More Subjects" v-model="be_odd_betterment_exam_fee_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Non-College Fee" v-model="be_odd_non_college_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
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
                  <v-btn type="submit" color="success darken-1" width="115" @click="exam_fee_update('Bachelor of Engineering','Odd')">Save</v-btn>

                  <v-btn color="error darken-1" width="115" @click="reset('Bachelor of Engineering','Odd')">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item value="even">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Examination Fee" v-model="be_even_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>Without Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="One Subject" v-model="be_even_compartmental_exam_fee_no_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Two or More Subjects" v-model="be_even_compartmental_exam_fee_no_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>With Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="Practicle With One Subject" v-model="be_even_compartmental_exam_fee_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Practical With Two or More Subjects" v-model="be_even_compartmental_exam_fee_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_one" placeholder="One Subject" v-model="be_even_betterment_exam_fee_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_more" placeholder="Two or More Subjects" v-model="be_even_betterment_exam_fee_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Non-College Fee" v-model="be_even_non_college_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
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
                  <v-btn type="submit" color="success darken-1" width="115" @click="exam_fee_update('Bachelor of Engineering','Even')">Save</v-btn>
                  <v-btn color="error darken-1" width="115" @click="reset('Bachelor of Engineering','Even')">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-tab-item>

      <v-tab-item value="msc">
        <v-card flat>
          <v-tabs v-model="semester_tab" light class="elevation-0" centered center-active>
            <v-tabs-slider v-show="false"></v-tabs-slider>
            <v-tab href="#odd" class="semester_border">odd semester</v-tab>
            <v-tab href="#even" class="semester_border">even semester</v-tab>
            <v-tab-item value="odd">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Examination Fee" v-model="msc_odd_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>Without Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="One Subject" v-model="msc_odd_compartmental_exam_fee_no_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Two or More Subjects" v-model="msc_odd_compartmental_exam_fee_no_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>With Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="Practicle With One Subject" v-model="msc_odd_compartmental_exam_fee_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Practical With Two or More Subjects" v-model="msc_odd_compartmental_exam_fee_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_one" placeholder="One Subject" v-model="msc_odd_betterment_exam_fee_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_more" placeholder="Two or More Subjects" v-model="msc_odd_betterment_exam_fee_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Non-College Fee" v-model="msc_odd_non_college_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
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
                  <v-btn type="submit" color="success darken-1" width="115" @click="exam_fee_update('Master of Science','Odd')">Save</v-btn>

                  <v-btn color="error darken-1" width="115" @click="reset('Master of Science','Odd')">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item value="even">
              <v-card flat>
                <v-card-text class="mt-4 pt-0 my-0 py-0">
                  <v-row justify="space-between">
                      <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Examination Fee" v-model="msc_even_examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>Without Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="One Subject" v-model="msc_even_compartmental_exam_fee_no_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Two or More Subjects" v-model="msc_even_compartmental_exam_fee_no_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <span>With Practical</span>
                        <v-text-field class="pt-2" :label="compartmental_label_one" placeholder="Practicle With One Subject" v-model="msc_even_compartmental_exam_fee_practicle_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="compartmental_label_more" placeholder="Practical With Two or More Subjects" v-model="msc_even_compartmental_exam_fee_practicle_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_one" placeholder="One Subject" v-model="msc_even_betterment_exam_fee_one" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field :label="betterment_label_more" placeholder="Two or More Subjects" v-model="msc_even_betterment_exam_fee_more" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
                        <v-text-field label="Non-College Fee" v-model="msc_even_non_college_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules="[rules.number]"></v-text-field>
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
                  <v-btn type="submit" color="success darken-1" width="115" @click="exam_fee_update('Master of Science','Even')">Save</v-btn>
                  <v-btn color="error darken-1" width="115" @click="reset('Master of Science','Even')">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs>
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
    return{
      isPageLoad: false,
      tab: null,
      tabs: 5,
      tab_title: ['Bachelor of Science','Bachelor of Science in Information Technology','Bachelor of Engineering','Master of Science','Master of Science(Chemistry)','PhD'],
      semester_tab: null,
      semester_title: ['odd semester', 'even semester'],
      rupee_icon: "mdi-currency-inr",

      compartmental_label_one: 'Compartmental(Back) Fee For One Subject',
      compartmental_label_more: 'Compartmental(Back) Fee For More Subjects',
      betterment_label_one: 'Betterment Fee For One Subject',
      betterment_label_more: 'Betterment Fee For More Subjects',

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

      bsc_depertment_id: '',
      it_depertment_id: '',
      be_depertment_id: '',
      msc_depertment_id: '',

      bsc_odd_examination_fee: '',
      bsc_odd_compartmental_exam_fee_practicle_one: '',
      bsc_odd_compartmental_exam_fee_practicle_more: '',
      bsc_odd_compartmental_exam_fee_no_practicle_one: '',
      bsc_odd_compartmental_exam_fee_no_practicle_more: '',
      bsc_odd_betterment_exam_fee_one: '',
      bsc_odd_betterment_exam_fee_more: '',
      bsc_odd_non_college_fee: '',
      bsc_odd_late_fee: '',
      bsc_odd_table_id: '',
      is_bsc_odd_exist: false,

      bsc_even_examination_fee: '',
      bsc_even_compartmental_exam_fee_practicle_one: '',
      bsc_even_compartmental_exam_fee_practicle_more: '',
      bsc_even_compartmental_exam_fee_no_practicle_one: '',
      bsc_even_compartmental_exam_fee_no_practicle_more: '',
      bsc_even_betterment_exam_fee_one: '',
      bsc_even_betterment_exam_fee_more: '',
      bsc_even_non_college_fee: '',
      bsc_even_late_fee: '',
      bsc_even_table_id: '',
      is_bsc_even_exist: false,

      it_odd_examination_fee: '',
      it_odd_compartmental_exam_fee_practicle_one: '',
      it_odd_compartmental_exam_fee_practicle_more: '',
      it_odd_compartmental_exam_fee_no_practicle_one: '',
      it_odd_compartmental_exam_fee_no_practicle_more: '',
      it_odd_betterment_exam_fee_one: '',
      it_odd_betterment_exam_fee_more: '',
      it_odd_non_college_fee: '',
      it_odd_late_fee: '',
      it_odd_table_id: '',
      is_it_odd_exist: false,

      it_even_examination_fee: '',
      it_even_compartmental_exam_fee_practicle_one: '',
      it_even_compartmental_exam_fee_practicle_more: '',
      it_even_compartmental_exam_fee_no_practicle_one: '',
      it_even_compartmental_exam_fee_no_practicle_more: '',
      it_even_betterment_exam_fee_one: '',
      it_even_betterment_exam_fee_more: '',
      it_even_non_college_fee: '',
      it_even_late_fee: '',
      it_even_table_id: '',
      is_it_even_exist: false,

      be_odd_examination_fee: '',
      be_odd_compartmental_exam_fee_practicle_one: '',
      be_odd_compartmental_exam_fee_practicle_more: '',
      be_odd_compartmental_exam_fee_no_practicle_one: '',
      be_odd_compartmental_exam_fee_no_practicle_more: '',
      be_odd_betterment_exam_fee_one: '',
      be_odd_betterment_exam_fee_more: '',
      be_odd_non_college_fee: '',
      be_odd_late_fee: '',
      be_odd_table_id: '',
      is_be_odd_exist: false,

      be_even_examination_fee: '',
      be_even_compartmental_exam_fee_practicle_one: '',
      be_even_compartmental_exam_fee_practicle_more: '',
      be_even_compartmental_exam_fee_no_practicle_one: '',
      be_even_compartmental_exam_fee_no_practicle_more: '',
      be_even_betterment_exam_fee_one: '',
      be_even_betterment_exam_fee_more: '',
      be_even_non_college_fee: '',
      be_even_late_fee: '',
      be_even_table_id: '',
      is_be_even_exist: false,

      msc_odd_examination_fee: '',
      msc_odd_compartmental_exam_fee_practicle_one: '',
      msc_odd_compartmental_exam_fee_practicle_more: '',
      msc_odd_compartmental_exam_fee_no_practicle_one: '',
      msc_odd_compartmental_exam_fee_no_practicle_more: '',
      msc_odd_betterment_exam_fee_one: '',
      msc_odd_betterment_exam_fee_more: '',
      msc_odd_non_college_fee: '',
      msc_odd_late_fee: '',
      msc_odd_table_id: '',
      is_msc_odd_exist: false,

      msc_even_examination_fee: '',
      msc_even_compartmental_exam_fee_practicle_one: '',
      msc_even_compartmental_exam_fee_practicle_more: '',
      msc_even_compartmental_exam_fee_no_practicle_one: '',
      msc_even_compartmental_exam_fee_no_practicle_more: '',
      msc_even_betterment_exam_fee_one: '',
      msc_even_betterment_exam_fee_more: '',
      msc_even_non_college_fee: '',
      msc_even_late_fee: '',
      msc_even_table_id: '',
      is_msc_even_exist: false,


      exam_fee_data: [],

      errorOccure: false,
      snackbar: false, // used to show the success or error msg.
      msg: '', // Success or Error msg after form submission
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

  mounted(){
    document.title = "Examination Fee Setting"
    localStorage.setItem('last_URL','/exam_settings')
    this.isPageLoad = true
    new Promise((resolve,reject)=>{
      axios({url: this.$store.state.exam_fee_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        // console.log(response.data);
        this.exam_fee_data = response.data
        resolve(response)
        this.get_exam_fee_details('Bachelor of Science')
        this.get_exam_fee_details('Bachelor of Science in Information Technology')
        this.get_exam_fee_details('Bachelor of Engineering')
        this.get_exam_fee_details('Master of Science')
        this.isPageLoad = false
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
    })
  },

  watch: {
    bsc_odd_date() {
      this.bsc_odd_last_date = this.formatDate(this.bsc_odd_date)
    },
    bsc_even_date() {
      this.bsc_even_last_date = this.formatDate(this.bsc_even_date)
    },

    it_odd_date() {
      this.it_odd_last_date = this.formatDate(this.it_odd_date)
    },
    it_even_date() {
      this.it_even_last_date = this.formatDate(this.it_even_date)
    },
    //
    be_odd_date() {
      this.be_odd_last_date = this.formatDate(this.be_odd_date)
    },
    be_even_date() {
      this.be_even_last_date = this.formatDate(this.be_even_date)
    },
    //
    msc_odd_date() {
      this.msc_odd_last_date = this.formatDate(this.msc_odd_date)
    },
    msc_even_date() {
      this.msc_even_last_date = this.formatDate(this.msc_even_date)
    },
    //
    // chem_odd_date() {
    //   this.chem_odd_last_date = this.formatDate(this.chem_odd_date)
    // },
    // chem_even_date() {
    //   this.chem_even_last_date = this.formatDate(this.chem_even_date)
    // },
    //
    // be_date() {
    //   this.be_last_date = this.formatDate(this.be_date)
    // },
    // phd_date() {
    //   this.phd_last_date = this.formatDate(this.phd_date)
    // },
  },

  methods: {
    parseInput(input) {
      if(!input) return null

      input =
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

    // Function to update or insert exam fee into database.
    exam_fee_update(depertment,semester){
      this.isPageLoad = true
      new Promise((resolve, reject)=>{
        axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
        .then(response=>{
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == 'Bachelor of Science'){
              this.bsc_depertment_id = response.data[i]['id']
            }
            else if(response.data[i]['dept_name'] == 'Bachelor of Science in Information Technology'){
              this.it_depertment_id = response.data[i]['id']
            }
            else if(response.data[i]['dept_name'] == 'Bachelor of Engineering'){
              this.be_depertment_id = response.data[i]['id']
            }
            else if(response.data[i]['dept_name'] == 'Master of Science'){
              this.msc_depertment_id = response.data[i]['id']
            }
          }
          console.log(this.bsc_odd_depertment_id);
          console.log(depertment,semester);
          if(semester=='Odd'){
            if(depertment=='Bachelor of Science'){
              new Promise((resolve,reject)=>{
                  if(this.is_bsc_odd_exist){
                    axios({url: this.$store.state.exam_fee_end_point +this.bsc_odd_table_id+'/', method: 'PUT',
                    headers: this.headers,
                    data: {
                      depertment_id: this.bsc_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.bsc_odd_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.bsc_odd_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.bsc_odd_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.bsc_odd_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.bsc_odd_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.bsc_odd_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.bsc_odd_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.bsc_odd_non_college_fee),
                      late_fee: this.parseInput(this.bsc_odd_late_fee),
                      last_date: this.convertDate(this.bsc_odd_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
                else{
                  axios({url: this.$store.state.exam_fee_end_point, method: 'POST',
                    headers: this.headers,
                    data: {
                      depertment_id: this.bsc_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.bsc_odd_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.bsc_odd_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.bsc_odd_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.bsc_odd_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.bsc_odd_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.bsc_odd_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.bsc_odd_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.bsc_odd_non_college_fee),
                      late_fee: this.parseInput(this.bsc_odd_late_fee),
                      last_date: this.convertDate(this.bsc_odd_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
              })
            }
            else if(depertment=='Bachelor of Science in Information Technology'){
              new Promise((resolve,reject)=>{
                  if(this.is_it_odd_exist){
                    axios({url: this.$store.state.exam_fee_end_point +this.it_odd_table_id+'/', method: 'PUT',
                    headers: this.headers,
                    data: {
                      depertment_id: this.it_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.it_odd_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.it_odd_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.it_odd_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.it_odd_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.it_odd_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.it_odd_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.it_odd_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.it_odd_non_college_fee),
                      late_fee: this.parseInput(this.it_odd_late_fee),
                      last_date: this.convertDate(this.it_odd_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
                else{
                  axios({url: this.$store.state.exam_fee_end_point, method: 'POST',
                    headers: this.headers,
                    data: {
                      depertment_id: this.it_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.it_odd_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.it_odd_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.it_odd_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.it_odd_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.it_odd_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.it_odd_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.it_odd_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.it_odd_non_college_fee),
                      late_fee: this.parseInput(this.it_odd_late_fee),
                      last_date: this.convertDate(this.it_odd_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
              })
            }
            else if(depertment=='Bachelor of Engineering'){
              new Promise((resolve,reject)=>{
                  if(this.is_be_odd_exist){
                    axios({url: this.$store.state.exam_fee_end_point +this.be_odd_table_id+'/', method: 'PUT',
                    headers: this.headers,
                    data: {
                      depertment_id: this.be_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.be_odd_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.be_odd_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.be_odd_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.be_odd_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.be_odd_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.be_odd_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.be_odd_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.be_odd_non_college_fee),
                      late_fee: this.parseInput(this.be_odd_late_fee),
                      last_date: this.convertDate(this.be_odd_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
                else{
                  axios({url: this.$store.state.exam_fee_end_point, method: 'POST',
                    headers: this.headers,
                    data: {
                      depertment_id: this.be_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.be_odd_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.be_odd_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.be_odd_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.be_odd_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.be_odd_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.be_odd_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.be_odd_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.be_odd_non_college_fee),
                      late_fee: this.parseInput(this.be_odd_late_fee),
                      last_date: this.convertDate(this.be_odd_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
              })
            }
            else if(depertment=='Master of Science'){
              new Promise((resolve,reject)=>{
                  if(this.is_msc_odd_exist){
                    axios({url: this.$store.state.exam_fee_end_point +this.msc_odd_table_id+'/', method: 'PUT',
                    headers: this.headers,
                    data: {
                      depertment_id: this.msc_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.msc_odd_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.msc_odd_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.msc_odd_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.msc_odd_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.msc_odd_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.msc_odd_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.msc_odd_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.msc_odd_non_college_fee),
                      late_fee: this.parseInput(this.msc_odd_late_fee),
                      last_date: this.convertDate(this.msc_odd_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
                else{
                  axios({url: this.$store.state.exam_fee_end_point, method: 'POST',
                    headers: this.headers,
                    data: {
                      depertment_id: this.msc_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.msc_odd_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.msc_odd_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.msc_odd_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.msc_odd_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.msc_odd_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.msc_odd_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.msc_odd_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.msc_odd_non_college_fee),
                      late_fee: this.parseInput(this.msc_odd_late_fee),
                      last_date: this.convertDate(this.msc_odd_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
              })
            }
          }
          else if(semester=='Even'){
            if(depertment=='Bachelor of Science'){
              new Promise((resolve,reject)=>{
                  if(this.is_bsc_even_exist){
                    axios({url: this.$store.state.exam_fee_end_point +this.bsc_even_table_id+'/', method: 'PUT',
                    headers: this.headers,
                    data: {
                      depertment_id: this.bsc_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.bsc_even_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.bsc_even_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.bsc_even_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.bsc_even_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.bsc_even_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.bsc_even_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.bsc_even_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.bsc_even_non_college_fee),
                      late_fee: this.parseInput(this.bsc_even_late_fee),
                      last_date: this.convertDate(this.bsc_even_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
                else{
                  axios({url: this.$store.state.exam_fee_end_point, method: 'POST',
                    headers: this.headers,
                    data: {
                      depertment_id: this.bsc_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.bsc_even_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.bsc_even_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.bsc_even_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.bsc_even_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.bsc_even_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.bsc_even_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.bsc_even_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.bsc_even_non_college_fee),
                      late_fee: this.parseInput(this.bsc_even_late_fee),
                      last_date: this.convertDate(this.bsc_even_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
              })
            }
            else if(depertment=='Bachelor of Science in Information Technology'){
              new Promise((resolve,reject)=>{
                  if(this.is_it_even_exist){
                    axios({url: this.$store.state.exam_fee_end_point +this.it_even_table_id+'/', method: 'PUT',
                    headers: this.headers,
                    data: {
                      depertment_id: this.it_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.it_even_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.it_even_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.it_even_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.it_even_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.it_even_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.it_even_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.it_even_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.it_even_non_college_fee),
                      late_fee: this.parseInput(this.it_even_late_fee),
                      last_date: this.convertDate(this.it_even_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
                else{
                  axios({url: this.$store.state.exam_fee_end_point, method: 'POST',
                    headers: this.headers,
                    data: {
                      depertment_id: this.it_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.it_even_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.it_even_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.it_even_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.it_even_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.it_even_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.it_even_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.it_even_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.it_even_non_college_fee),
                      late_fee: this.parseInput(this.it_even_late_fee),
                      last_date: this.convertDate(this.it_even_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
              })
            }
            else if(depertment=='Bachelor of Engineering'){
              new Promise((resolve,reject)=>{
                  if(this.is_be_even_exist){
                    axios({url: this.$store.state.exam_fee_end_point +this.be_even_table_id+'/', method: 'PUT',
                    headers: this.headers,
                    data: {
                      depertment_id: this.be_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.be_even_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.be_even_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.be_even_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.be_even_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.be_even_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.be_even_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.be_even_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.be_even_non_college_fee),
                      late_fee: this.parseInput(this.be_even_late_fee),
                      last_date: this.convertDate(this.be_even_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
                else{
                  axios({url: this.$store.state.exam_fee_end_point, method: 'POST',
                    headers: this.headers,
                    data: {
                      depertment_id: this.be_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.be_even_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.be_even_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.be_even_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.be_even_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.be_even_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.be_even_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.be_even_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.be_even_non_college_fee),
                      late_fee: this.parseInput(this.be_even_late_fee),
                      last_date: this.convertDate(this.be_even_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
              })
            }
            else if(depertment=='Master of Science'){
              new Promise((resolve,reject)=>{
                  if(this.is_msc_even_exist){
                    axios({url: this.$store.state.exam_fee_end_point +this.msc_even_table_id+'/', method: 'PUT',
                    headers: this.headers,
                    data: {
                      depertment_id: this.msc_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.msc_even_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.msc_even_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.msc_even_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.msc_even_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.msc_even_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.msc_even_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.msc_even_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.msc_even_non_college_fee),
                      late_fee: this.parseInput(this.msc_even_late_fee),
                      last_date: this.convertDate(this.msc_even_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
                else{
                  axios({url: this.$store.state.exam_fee_end_point, method: 'POST',
                    headers: this.headers,
                    data: {
                      depertment_id: this.msc_depertment_id,
                      semester: semester,
                      regular_exam_fee: this.parseInput(this.msc_even_examination_fee),
                      compartmetal_exam_fee_practicle_one: this.parseInput(this.msc_even_compartmental_exam_fee_practicle_one),
                      compartmetal_exam_fee_practicle_more: this.parseInput(this.msc_even_compartmental_exam_fee_practicle_more),
                      compartmetal_exam_fee_no_practicle_one: this.parseInput(this.msc_even_compartmental_exam_fee_no_practicle_one),
                      compartmetal_exam_fee_no_practicle_more: this.parseInput(this.msc_even_compartmental_exam_fee_no_practicle_more),
                      betterment_exam_fee_one: this.parseInput(this.msc_even_betterment_exam_fee_one),
                      betterment_exam_fee_more: this.parseInput(this.msc_even_betterment_exam_fee_more),
                      non_college_fee: this.parseInput(this.msc_even_non_college_fee),
                      late_fee: this.parseInput(this.msc_even_late_fee),
                      last_date: this.convertDate(this.msc_even_last_date),
                    }
                  })
                  .then(response=>{
                    console.log(response);
                    this.errorOccure = false
                    this.snackbar = true
                    this.msg = 'Successfully Updated'
                    resolve(response)
                  })
                  .catch(error=>{
                    console.log(error);
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly..'
                    reject(error)
                  })
                }
              })
            }
          }
          this.isPageLoad = false
          resolve(response)
        })
        .catch(error=>{
          console.log(error);
          reject(error)
        })
      })
    },

    // Function to get the exam fee details from databse.
    get_exam_fee_details(depertment){
      for(var i=0; i<this.exam_fee_data.length; i++){
        if(this.exam_fee_data[i]['depertment']==depertment && this.exam_fee_data[i]['semester']=="Odd"){
          if(depertment=='Bachelor of Science'){
            this.is_bsc_odd_exist = true
            this.bsc_odd_table_id = this.exam_fee_data[i]['id']
            this.bsc_depertment_id = this.exam_fee_data[i]['depertment_id']
            this.bsc_odd_examination_fee = this.exam_fee_data[i]['regular_exam_fee']
            this.bsc_odd_compartmental_exam_fee_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_one']
            this.bsc_odd_compartmental_exam_fee_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_more']
            this.bsc_odd_compartmental_exam_fee_no_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_one']
            this.bsc_odd_compartmental_exam_fee_no_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_more']
            this.bsc_odd_betterment_exam_fee_one = this.exam_fee_data[i]['betterment_exam_fee_one']
            this.bsc_odd_betterment_exam_fee_more = this.exam_fee_data[i]['betterment_exam_fee_more']
            this.bsc_odd_non_college_fee = this.exam_fee_data[i]['non_college_fee']
            this.bsc_odd_late_fee = this.exam_fee_data[i]['late_fee']
            this.bsc_odd_last_date = this.formatDate(this.exam_fee_data[i]['last_date'])
          }
          else if(depertment=='Bachelor of Science in Information Technology'){
            this.is_it_odd_exist = true
            this.it_odd_table_id = this.exam_fee_data[i]['id']
            this.it_depertment_id = this.exam_fee_data[i]['depertment_id']
            this.it_odd_examination_fee = this.exam_fee_data[i]['regular_exam_fee']
            this.it_odd_compartmental_exam_fee_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_one']
            this.it_odd_compartmental_exam_fee_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_more']
            this.it_odd_compartmental_exam_fee_no_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_one']
            this.it_odd_compartmental_exam_fee_no_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_more']
            this.it_odd_betterment_exam_fee_one = this.exam_fee_data[i]['betterment_exam_fee_one']
            this.it_odd_betterment_exam_fee_more = this.exam_fee_data[i]['betterment_exam_fee_more']
            this.it_odd_non_college_fee = this.exam_fee_data[i]['non_college_fee']
            this.it_odd_late_fee = this.exam_fee_data[i]['late_fee']
            this.it_odd_last_date = this.formatDate(this.exam_fee_data[i]['last_date'])
          }
          else if(depertment=='Bachelor of Engineering'){
            this.is_be_odd_exist = true
            this.be_odd_table_id = this.exam_fee_data[i]['id']
            this.be_depertment_id = this.exam_fee_data[i]['depertment_id']
            this.be_odd_examination_fee = this.exam_fee_data[i]['regular_exam_fee']
            this.be_odd_compartmental_exam_fee_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_one']
            this.be_odd_compartmental_exam_fee_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_more']
            this.be_odd_compartmental_exam_fee_no_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_one']
            this.be_odd_compartmental_exam_fee_no_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_more']
            this.be_odd_betterment_exam_fee_one = this.exam_fee_data[i]['betterment_exam_fee_one']
            this.be_odd_betterment_exam_fee_more = this.exam_fee_data[i]['betterment_exam_fee_more']
            this.be_odd_non_college_fee = this.exam_fee_data[i]['non_college_fee']
            this.be_odd_late_fee = this.exam_fee_data[i]['late_fee']
            this.be_odd_last_date = this.formatDate(this.exam_fee_data[i]['last_date'])
          }
          else if(depertment=='Master of Science'){
            this.is_msc_odd_exist = true
            this.msc_odd_table_id = this.exam_fee_data[i]['id']
            this.msc_depertment_id = this.exam_fee_data[i]['depertment_id']
            this.msc_odd_examination_fee = this.exam_fee_data[i]['regular_exam_fee']
            this.msc_odd_compartmental_exam_fee_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_one']
            this.msc_odd_compartmental_exam_fee_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_more']
            this.msc_odd_compartmental_exam_fee_no_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_one']
            this.msc_odd_compartmental_exam_fee_no_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_more']
            this.msc_odd_betterment_exam_fee_one = this.exam_fee_data[i]['betterment_exam_fee_one']
            this.msc_odd_betterment_exam_fee_more = this.exam_fee_data[i]['betterment_exam_fee_more']
            this.msc_odd_non_college_fee = this.exam_fee_data[i]['non_college_fee']
            this.msc_odd_late_fee = this.exam_fee_data[i]['late_fee']
            this.msc_odd_last_date = this.formatDate(this.exam_fee_data[i]['last_date'])
          }
        }
        if(this.exam_fee_data[i]['depertment']==depertment && this.exam_fee_data[i]['semester']=="Even"){
          if(depertment=='Bachelor of Science'){
            this.is_bsc_even_exist = true
            this.bsc_even_table_id = this.exam_fee_data[i]['id']
            this.bsc_depertment_id = this.exam_fee_data[i]['depertment_id']
            this.bsc_even_examination_fee = this.exam_fee_data[i]['regular_exam_fee']
            this.bsc_even_compartmental_exam_fee_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_one']
            this.bsc_even_compartmental_exam_fee_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_more']
            this.bsc_even_compartmental_exam_fee_no_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_one']
            this.bsc_even_compartmental_exam_fee_no_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_more']
            this.bsc_even_betterment_exam_fee_one = this.exam_fee_data[i]['betterment_exam_fee_one']
            this.bsc_even_betterment_exam_fee_more = this.exam_fee_data[i]['betterment_exam_fee_more']
            this.bsc_even_non_college_fee = this.exam_fee_data[i]['non_college_fee']
            this.bsc_even_late_fee = this.exam_fee_data[i]['late_fee']
            this.bsc_even_last_date = this.formatDate(this.exam_fee_data[i]['last_date'])
          }
          else if(depertment=='Bachelor of Science in Information Technology'){
            this.is_it_even_exist = true
            this.it_even_table_id = this.exam_fee_data[i]['id']
            this.it_depertment_id = this.exam_fee_data[i]['depertment_id']
            this.it_even_examination_fee = this.exam_fee_data[i]['regular_exam_fee']
            this.it_even_compartmental_exam_fee_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_one']
            this.it_even_compartmental_exam_fee_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_more']
            this.it_even_compartmental_exam_fee_no_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_one']
            this.it_even_compartmental_exam_fee_no_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_more']
            this.it_even_betterment_exam_fee_one = this.exam_fee_data[i]['betterment_exam_fee_one']
            this.it_even_betterment_exam_fee_more = this.exam_fee_data[i]['betterment_exam_fee_more']
            this.it_even_non_college_fee = this.exam_fee_data[i]['non_college_fee']
            this.it_even_late_fee = this.exam_fee_data[i]['late_fee']
            this.it_even_last_date = this.formatDate(this.exam_fee_data[i]['last_date'])
          }
          else if(depertment=='Bachelor of Engineering'){
            this.is_be_even_exist = true
            this.be_even_table_id = this.exam_fee_data[i]['id']
            this.be_depertment_id = this.exam_fee_data[i]['depertment_id']
            this.be_even_examination_fee = this.exam_fee_data[i]['regular_exam_fee']
            this.be_even_compartmental_exam_fee_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_one']
            this.be_even_compartmental_exam_fee_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_more']
            this.be_even_compartmental_exam_fee_no_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_one']
            this.be_even_compartmental_exam_fee_no_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_more']
            this.be_even_betterment_exam_fee_one = this.exam_fee_data[i]['betterment_exam_fee_one']
            this.be_even_betterment_exam_fee_more = this.exam_fee_data[i]['betterment_exam_fee_more']
            this.be_even_non_college_fee = this.exam_fee_data[i]['non_college_fee']
            this.be_even_late_fee = this.exam_fee_data[i]['late_fee']
            this.be_even_last_date = this.formatDate(this.exam_fee_data[i]['last_date'])
          }
          else if(depertment=='Master of Science'){
            this.is_msc_even_exist = true
            this.msc_even_table_id = this.exam_fee_data[i]['id']
            this.msc_depertment_id = this.exam_fee_data[i]['depertment_id']
            this.msc_even_examination_fee = this.exam_fee_data[i]['regular_exam_fee']
            this.msc_even_compartmental_exam_fee_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_one']
            this.msc_even_compartmental_exam_fee_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_practicle_more']
            this.msc_even_compartmental_exam_fee_no_practicle_one = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_one']
            this.msc_even_compartmental_exam_fee_no_practicle_more = this.exam_fee_data[i]['compartmetal_exam_fee_no_practicle_more']
            this.msc_even_betterment_exam_fee_one = this.exam_fee_data[i]['betterment_exam_fee_one']
            this.msc_even_betterment_exam_fee_more = this.exam_fee_data[i]['betterment_exam_fee_more']
            this.msc_even_non_college_fee = this.exam_fee_data[i]['non_college_fee']
            this.msc_even_late_fee = this.exam_fee_data[i]['late_fee']
            this.msc_even_last_date = this.formatDate(this.exam_fee_data[i]['last_date'])
          }
        }
      }
      console.log(this.exam_fee_data);
    },

    // To reset the fields.
    reset(depertment, semester){
      if(semester=='Odd'){
        if(depertment=='Bachelor of Science'){
          this.bsc_odd_examination_fee = ''
          this.bsc_odd_compartmental_exam_fee_practicle_one = ''
          this.bsc_odd_compartmental_exam_fee_practicle_more = ''
          this.bsc_odd_compartmental_exam_fee_no_practicle_one = ''
          this.bsc_odd_compartmental_exam_fee_no_practicle_more = ''
          this.bsc_odd_betterment_exam_fee_one = ''
          this.bsc_odd_betterment_exam_fee_more = ''
          this.bsc_odd_non_college_fee = ''
          this.bsc_odd_late_fee = ''
          this.bsc_odd_last_date = ''
        }
        else if(depertment=='Bachelor of Science in Information Technology'){
          this.it_odd_examination_fee = ''
          this.it_odd_compartmental_exam_fee_practicle_one = ''
          this.it_odd_compartmental_exam_fee_practicle_more = ''
          this.it_odd_compartmental_exam_fee_no_practicle_one = ''
          this.it_odd_compartmental_exam_fee_no_practicle_more = ''
          this.it_odd_betterment_exam_fee_one = ''
          this.it_odd_betterment_exam_fee_more = ''
          this.it_odd_non_college_fee = ''
          this.it_odd_late_fee = ''
          this.it_odd_last_date = ''
        }
        else if(depertment=='Bachelor of Engineering'){
          this.be_odd_examination_fee = ''
          this.be_odd_compartmental_exam_fee_practicle_one = ''
          this.be_odd_compartmental_exam_fee_practicle_more = ''
          this.be_odd_compartmental_exam_fee_no_practicle_one = ''
          this.be_odd_compartmental_exam_fee_no_practicle_more = ''
          this.be_odd_betterment_exam_fee_one = ''
          this.be_odd_betterment_exam_fee_more = ''
          this.be_odd_non_college_fee = ''
          this.be_odd_late_fee = ''
          this.be_odd_last_date = ''
        }
        else if(depertment=='Master of Science'){
          this.msc_odd_examination_fee = ''
          this.msc_odd_compartmental_exam_fee_practicle_one = ''
          this.msc_odd_compartmental_exam_fee_practicle_more = ''
          this.msc_odd_compartmental_exam_fee_no_practicle_one = ''
          this.msc_odd_compartmental_exam_fee_no_practicle_more = ''
          this.msc_odd_betterment_exam_fee_one = ''
          this.msc_odd_betterment_exam_fee_more = ''
          this.msc_odd_non_college_fee = ''
          this.msc_odd_late_fee = ''
          this.msc_odd_last_date = ''
        }
      }
      if(semester=='Even'){
        if(depertment=='Bachelor of Science'){
          this.bsc_even_examination_fee = ''
          this.bsc_even_compartmental_exam_fee_practicle_one = ''
          this.bsc_even_compartmental_exam_fee_practicle_more = ''
          this.bsc_even_compartmental_exam_fee_no_practicle_one = ''
          this.bsc_even_compartmental_exam_fee_no_practicle_more = ''
          this.bsc_even_betterment_exam_fee_one = ''
          this.bsc_even_betterment_exam_fee_more = ''
          this.bsc_even_non_college_fee = ''
          this.bsc_even_late_fee = ''
          this.bsc_even_last_date = ''
        }
        else if(depertment=='Bachelor of Science in Information Technology'){
          this.it_even_examination_fee = ''
          this.it_even_compartmental_exam_fee_practicle_one = ''
          this.it_even_compartmental_exam_fee_practicle_more = ''
          this.it_even_compartmental_exam_fee_no_practicle_one = ''
          this.it_even_compartmental_exam_fee_no_practicle_more = ''
          this.it_even_betterment_exam_fee_one = ''
          this.it_even_betterment_exam_fee_more = ''
          this.it_even_non_college_fee = ''
          this.it_even_late_fee = ''
          this.it_even_last_date = ''
        }
        else if(depertment=='Bachelor of Engineering'){
          this.be_even_examination_fee = ''
          this.be_even_compartmental_exam_fee_practicle_one = ''
          this.be_even_compartmental_exam_fee_practicle_more = ''
          this.be_even_compartmental_exam_fee_no_practicle_one = ''
          this.be_even_compartmental_exam_fee_no_practicle_more = ''
          this.be_even_betterment_exam_fee_one = ''
          this.be_even_betterment_exam_fee_more = ''
          this.be_even_non_college_fee = ''
          this.be_even_late_fee = ''
          this.be_even_last_date = ''
        }
        else if(depertment=='Master of Science'){
          this.msc_even_examination_fee = ''
          this.msc_even_compartmental_exam_fee_practicle_one = ''
          this.msc_even_compartmental_exam_fee_practicle_more = ''
          this.msc_even_compartmental_exam_fee_no_practicle_one = ''
          this.msc_even_compartmental_exam_fee_no_practicle_more = ''
          this.msc_even_betterment_exam_fee_one = ''
          this.msc_even_betterment_exam_fee_more = ''
          this.msc_even_non_college_fee = ''
          this.msc_even_late_fee = ''
          this.msc_even_last_date = ''
        }
      }
    }
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
