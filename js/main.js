let eventBus = new Vue()

Vue.component('Notes', {
    template:`
    <div id="Notes">
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
`,
    data() {
        return {
            noteOne: [],
            noteTwo: [],
            noteThree: [],
            noteFore: []
        }
    },
    mounted() {
        eventBus.$on('firstColumn', noteCard => {
            this.noteOne.push(noteCard)
        })
        eventBus.$on('secondColumn', noteCard => {
            this.noteTwo.push(noteCard)


        })
        eventBus.$on('thirdColumn', noteCard => {
            this.noteThree.push(noteCard)
        })
        eventBus.$on('forthColumn', noteCard => {
            this.noteFore.push(noteCard)
            noteCard.completedOnTime = new Date().toLocaleDateString()
        })
    },

})

Vue.component('columnOne', {
    template: `
        <div class="col">
            <h3>New task</h3>
            <div class="column-one" v-for="noteCard in noteOne">
                <p>{{noteCard.name}}</p>
                <ul>
                    <li class="tasks">Description: {{noteCard.task}}</li>
                    <li class="tasks">Date of creation:
                    {{ noteCard.dateCreate }}</li>
                    <li class="tasks">Deadline: {{noteCard.dateDeadline}}</li>
                    <li class="tasks" v-if="noteCard.update != null">Last updated: {{ noteCard.update }}</li>
                </ul>
                <a @click="updateNote(noteCard)">Update</a>
                <a @click="deleteNote(noteCard)">Delete</a>
                <a @click="nextNote(noteCard)">Next ></a>
            </div>
        </div>
    `,
    props: {
        noteOne: {
            type: Array,
        },
        noteTwo: {
            type: Array,
        },
        noteCard: {
            type: Object
        },
    },
    methods: {
        nextNote(noteCard) {
            this.noteOne.splice(this.noteOne.indexOf(noteCard), 1)
            eventBus.$emit('secondColumn', noteCard)
        },
        deleteNote(noteCard) {
            this.noteOne.splice(this.noteOne.indexOf(noteCard), 1)
        },
        updateNote(noteCard) {
            noteCard.name = prompt('Name of new task', noteCard.name)
            noteCard.task = prompt('New task', noteCard.task)
            noteCard.dateDeadline = prompt('Deadline for task', noteCard.dateDeadline)
            noteCard.update = new Date().toLocaleString()
        }
    },

})

Vue.component('columnTwo', {
    template: `
        <div class="col">
            <h2>Tasks in progress</h2>
            <div class="column-one" v-for="noteCard in noteTwo">
                <p>{{noteCard.name}}</p>
                <ul>
                    <li class="tasks">Description: {{noteCard.task}}</li>
                    <li class="tasks">Date of creation:
                    {{ noteCard.dateCreate }}</li>
                    <li class="tasks">Deadline: {{noteCard.dateDeadline}}</li>
                    <li class="tasks" v-if="noteCard.reasonForReturn != null">Reason of return: {{ noteCard.reasonForReturn }}</li>
                    <li class="tasks" v-if="noteCard.update != null">Last updated: {{ noteCard.update }}</li>
                </ul>
                <a @click="updateNote(noteCard)">Update</a>
                <a @click="nextNote(noteCard)">Next ></a>

            </div>
        </div>
    `,
    props: {
        noteTwo: {
            type: Array,
        },
        noteCard: {
            type: Object
        }
    },
    methods: {
        nextNote(noteCard) {
            this.noteTwo.splice(this.noteTwo.indexOf(noteCard), 1)
            eventBus.$emit('thirdColumn', noteCard)
        },
        updateNote(noteCard) {
            noteCard.name = prompt('Name of new task', noteCard.name)
            noteCard.task = prompt('New task', noteCard.task)
            noteCard.dateDeadline = prompt('Deadline for task', noteCard.dateDeadline)
            noteCard.update = new Date().toLocaleString()
        }
    }
})

Vue.component('columnThree', {
    template: `
        <div class="col">
            <h3>Testing</h3>
            <div class="column-one" v-for="noteCard in noteThree" >
                <p>{{noteCard.name}}</p>
                <ul>
                    <li class="tasks">Description: {{noteCard.task}}</li>
                    <li class="tasks">Date of creation:
                    {{ noteCard.dateCreate }}</li>
                    <li class="tasks">Deadline: {{noteCard.dateDeadline}}</li>
                    <li class="tasks" v-if="noteCard.reasonForReturn != null">Reason of return: {{ noteCard.reasonForReturn }}</li>
                    <li class="tasks" v-if="noteCard.update != null">Last updated: {{ noteCard.update}}</li>
                </ul>
                <a @click="updateNote(noteCard)">Update</a>
                <a @click="nextNote(noteCard)">Next ></a>
                <a @click="Previous(noteCard)">< Previous</a>
            </div>
        </div>
    `,
    props: {
        noteThree: {
            type: Array,
        },
        noteCard: {
            type: Object
        }
    },
    methods: {
        nextNote(noteCard) {
            this.noteThree.splice(this.noteThree.indexOf(noteCard), 1)
            eventBus.$emit('forthColumn', noteCard)
        },
        Previous(noteCard) {
            noteCard.reason = prompt('reason for transfer')
            this.noteThree.splice(this.noteThree.indexOf(noteCard), 1)
            eventBus.$emit('secondColumn', noteCard)
        },
        updateNote(noteCard) {
            noteCard.name = prompt('Name of new task', noteCard.name)
            noteCard.task = prompt('New task', noteCard.task)
            noteCard.dateDeadline = prompt('Deadline for task', noteCard.dateDeadline)
            noteCard.edit = new Date().toLocaleString()
        }
    }
})

Vue.component('columnFore', {
    template: `
        <div class="col">
            <h3>Completed tasks</h3>
            <div class="column-one" v-for="noteCard in noteFore">
                <p>{{noteCard.name}}</p>
                <ul>
                    <li class="tasks">Description: {{noteCard.task}}</li>
                    <li class="tasks">Date of creation:
                    {{ noteCard.dateCreate }}</li>
                    <li class="tasks">Deadline: {{noteCard.dateDeadline}}</li>
                    <li class="tasks" v-if="noteCard.dateDeadline >= noteCard.completedOnTime">Сompleted in time</li>
                    <li class="tasks" v-if="noteCard.dateDeadline < noteCard.completedOnTime">Not completed in time</li>
                </ul>
            </div>
        </div>
    `,
    props: {
        noteFore: {
            type: Array,
        },
        noteCard: {
            type: Object
        }
    },
    computed:  {
        completedCard() {
            let completed = null
            if (Notes.noteFore.noteCard.dateDeadline < Notes.noteFore.noteCard.completedOnTime) {
                completed = 'Сompleted on time'
            } else {
                completed = 'Not completed on time'
            }
            return completed
        }
    }
})

Vue.component('note-add', {
    template: `
    <div class="addform">
        <form>
            <p>
                <label for="name">Name of the note</label>
                <input id="form-name" required v-model="name" maxlength="30" type="text" placeholder="title">
            </p>
            <div>
                <label for="description">Description for new note</label>
                <textarea required id="form-input" rows="5" columns="10" v-model="task" maxlength="60"> </textarea>
            </div>
            <div>
                <label for="deadline">Deadline of the note</label>
                <input required type="date" required placeholder="01.01.1990" id="form-date" v-model="dateDeadline">
            </div>
            <button @click="onSubmit">Add a task</button>
        </form>
    </div>
    `,
    data() {
        return {
            name: null,
            task: null,
            dateCreate: null,
            dateDeadline: null,
        }
    },
    methods: {
        onSubmit() {
            let noteCard = {
                name: this.name,
                task: this.task,
                dateCreate: new Date().toLocaleString(),
                dateDeadline: this.dateDeadline,
                reasonForReturn: null,
                update: null,
                completedOnTime: null
            }
            eventBus.$emit('firstColumn', noteCard)
            this.name = null
            this.task = null
            this.dateDeadline = null
            this.dateCreate = null
            console.log(noteCard)
        }
    }
})


let app = new Vue({
    el: '#app',
    data: {
        name: 'Kanban boards'
    },
    methods: {

    }
})