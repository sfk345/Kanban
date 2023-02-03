let eventBus = new Vue()
Vue.component('Notes', {
    template: `
       <div class="Notes">
           <div class="all-cards">
                <div class="note">
                    <columnOne :noteOne="noteOne"></columnOne>
                </div>
                <div class="note">
                    <columnTwo :noteTwo="noteTwo"></columnTwo>
                </div>
                <div class="note">
                    <columnThree :noteThree="noteThree"></columnThree>
                </div>
                <div class="note">
                    <columnFore :noteFore="noteFore"></columnFore>
                </div>
                <note-add></note-add>
           </div>
       </div>`,
    data() {
        return {
            noteOne:[],
            noteTwo:[],
            noteThree:[],
            noteFore:[]
        }
    },
    mounted() {
        eventBus.$on('firstColumn', noteCard => {
            this.noteOne.push(noteCard)

            console.log(this.noteOne)
        })
        eventBus.$on('secondColumn', noteCard => {
            this.noteTwo.push(noteCard)

            console.log(this.noteTwo)

        })
        eventBus.$on('thirdColumn', noteCard => {
            this.noteThree.push(noteCard)

            console.log(this.noteThree)
        })
        eventBus.$on('forthColumn', noteCard => {
            this.noteFore.push(noteCard)
            noteCard.completedOnTime = new Date().toLocaleString()

        })

    },


})
Vue.component('columnOne', {
    template: `
       <div class="column">
                <div class="column-one">
                <h3>New tasks</h3>
                    <div>
                        <p>{{noteCard.name}}</p>
                        <ul>
                            <li>Description of task: {{noteCard.task}}</li>
                            <li>Date of creation: {{noteCard.dateCreate}}</li>
                            <li>Date of deadline: {{noteCard.dateTask}}</li>
                            <li v-if="noteCard.update != null">Last updated: {{noteCard.update}}</li>
                        </ul>
                        <button @click="ChangNote(noteCard)">Change</button>
                        <button @click="UpdateNote(noteCard)">Update</button>
                        <button @click="DeleteNote(noteCard)">Delete</button>
                    </div>
                </div>
       </div>`,
    methods: {
        DeleteNote(noteCard){
            this.noteOne.splice(this.noteOne.indexOf(noteCard), 1)
            console.log(noteCard)
        },
        UpdateNote(noteCard){
            noteCard.name = prompt('Name of new task:', noteCard.name)
            noteCard.task = prompt('New task:', noteCard.task)
            noteCard.dateTask = prompt('Date of deadline:', noteCard.dateTask)
            noteCard.update = new Date().toLocaleString()
        },
        ChangNote(noteCard){
            this.noteOne.splice(this.noteOne.indexOf(noteCard), 1)
            eventBus.$emit('secondColumn', noteCard)
        }
    },
    props: {
        noteOne:{
            type: Array

        },
        noteTwo:{
            type: Array

        },
        noteCard:{
            type: Object

        },
    },

})
Vue.component('columnTwo', {
    template: `
       <div class="column">
                <div class="column-one">
                <h3>Task in progress</h3>
                    <div>
                        <p>{{noteCard.name}}</p>
                        <ul>
                            <li>Description of task: {{noteCard.task}}</li>
                            <li>Date of creation: {{noteCard.dateCreate}}</li>
                            <li>Date of deadline: {{noteCard.dateTask}}</li>
                            <li v-if="noteCard.update != null">Last updated: {{noteCard.update}}</li>
                        </ul>
                        <button @click="ChangeNoteTwo(noteCard)">Change</button>
                        <button @click="UpdateNoteTwo(noteCard)">Update</button>
                    </div>
                </div>
       </div>`,
    props: {
        noteTwo:{
            type: Array,

        },
        noteCard: {
            type: Object
        }

    },
    methods: {
        ChangeNoteTwo(noteCard) {
            this.noteTwo.splice(this.noteTwo.indexOf(noteCard), 1)
            eventBus.$emit('thirdColumn', noteCard)
        }

        },
        UpdateNoteTwo(noteCard){
            noteCard.name = prompt('Name of new task:', noteCard.name)
            noteCard.task = prompt('New task:', noteCard.task)
            noteCard.dateTask = prompt('Date of deadline:', noteCard.dateTask)
            noteCard.update = new Date().toLocaleString()
        },

})
Vue.component('columnThree', {
    template: `
       <div class="column">
                <div class="column-one">
                <h3>Tested tasks</h3>
                    <div>
                        <p>{{noteCard.name}}</p>
                        <ul>
                            <li>Description of task: {{noteCard.task}}</li>
                            <li>Date of creation: {{noteCard.dateCreate}}</li>
                            <li>Date of deadline: {{noteCard.dateTask}}</li>
                            <li v-if="noteCard.update != null">Last updated: {{noteCard.update}}</li>
                            <li v-if="noteCard.reasonForReturn != null">Reason for return: {{noteCard.reasonForReturn}}</li>
                        </ul>
                        <button @click="ChangeNoteThree(noteCard)">Change</button>
                        <button @click="UpdateNoteThree(noteCard)">Update</button>
                        <button @click="BringBack(noteCard)">Back</button>
                    </div>
                </div>
       </div>`,
    props: {
        noteThree:{
            type: Array,
            required: false

        },
        noteCard:{
            type: Object
        }

    },
    methods:{
        ChangeNoteThree(noteCard) {
            this.noteThree.splice(this.noteThree.indexOf(noteCard), 1)
            eventBus.$emit('forthColumn', noteCard)
        },
        UpdateNoteThree(noteCard){
            noteCard.name = prompt('Name of new task:', noteCard.name)
            noteCard.task = prompt('New task:', noteCard.task)
            noteCard.dateTask = prompt('Date of deadline:', noteCard.dateTask)
            noteCard.update = new Date().toLocaleString()
        },
        BringBack(noteCard){
            noteCard.reasonForReturn = prompt('Your reason for return this note:')
            this.noteThree.splice(this.noteThree.indexOf(noteCard), 1)
            eventBus.$emit('secondColumn', noteCard)
        }
    },

})
Vue.component('columnFore', {
    template: `
       <div class="column">
                <div class="column-one">
                <h3>Completed task</h3>
                    <div>
                        <p>{{noteCard.name}}</p>
                        <ul>
                            <li>Description of task: {{noteCard.task}}</li>
                            <li>Date of creation: {{noteCard.dateCreate}}</li>
                            <li>Date of deadline: {{noteCard.dateTask}}</li>
                            <li v-if="noteCard.update != null">Last updated: {{noteCard.update}}</li>
                            <li v-if="noteCard.dateTask">Date of creation: {{noteCard.dateCreate}}</li>
                        </ul>
                        <button @click="ChangNote(noteCard)">Change</button>
                        <button @click="UpdateNote(noteCard)">Update</button>
                        <button @click="DeleteNote(noteCard)">Delete</button>
                    </div>
                </div>
       </div>`,
    methods: {
        DeleteNote(noteCard){
            this.noteOne.splice(this.noteOne.indexOf(noteCard), 1)
            console.log(noteCard)
        },
        UpdateNote(noteCard){
            noteCard.name = prompt('Name of new task:', noteCard.name)
            noteCard.task = prompt('New task:', noteCard.task)
            noteCard.dateTask = prompt('Date of deadline:', noteCard.dateTask)
            noteCard.update = new Date().toLocaleString()
        },
        ChangNote(noteCard){
            this.noteOne.splice(this.noteOne.indexOf(noteCard), 1)
            eventBus.$emit('secondColumn', noteCard)
        }
    },
    props: {
        noteOne:{
            type: Array

        },
        noteTwo:{
            type: Array

        },
        noteCard:{
            type: Object

        },
    },

})

Vue.component('note-add', {
    template: `   
       <div>
       <form class="note-form">
            <label for="name" class="form-label">Name of the note</label>
           <input class="form-input" id="name" v-model="name" required placeholder="task">
            <div class="name-column">
                <label for="task" class="form-label">Add note</label>
                <textarea class="form-input" id="task" v-model="task" required placeholder="task"></textarea>
            </div>
            <div class="name-column">
                <label for="dateTask" class="form-label">Deadline date</label>
                <input class="form-input" id="dateTask" v-model="dateTask" type="date">
            </div>
            <input @click="onSubmit" class="btn" type="button" value="Create"> 
       </form>
       </div>`,

    data() {
        return {
            name: null,
            task:null,
            dateTask:null,
            dateCreate: null,
        }
    },
    methods: {
        onSubmit() {
            let noteCard = {
                name: this.name,
                task: this.task,
                dateTask: this.dateTask,
                dateCreate: new Date().toLocaleString(),
                update: null,
                reasonForReturn: null,
                completedOnTime: null
            }
            eventBus.$emit('firstColumn', noteCard)
                this.name = null
                this.task = null
                this.dateTask = null
                this.dateCreate = null
        },

    },

    props: {
        noteOne:{
            type: Array,
            required: false

        }
    },

})

let app = new Vue({
    el: '#app',
    data: {
        name: "Kanban application"
    },

})