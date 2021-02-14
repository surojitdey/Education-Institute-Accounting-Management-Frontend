<template>
    <v-menu
        :value="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                :value="date_value"
                @change="$emit('date-picked', event.target.value)"
                label="Last Date of Admisson"
                append-icon="event"
                v-on="on"
                outlined
            ></v-text-field>
        </template>
        <v-date-picker :value="date_picker_value" @input="$emit('menu-close')"></v-date-picker>
    </v-menu>
</template>
<script>
export default {
    props: [
        'menu',
        'date_value',
        'date_picker_value'
    ],
    computed: {
        menu_flag () {
            console.log('menu', this.menu)
            return this.menu
        },
        date_picker () {
            console.log('date_picker', this.date_picker_value)
            return this.date_picker_value
        }
    },
    watch: {
        date_picker_value() {
            console.log('date_picker', this.date_picker_value)
        }
    },
    methods: {
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
    }
}
</script>
