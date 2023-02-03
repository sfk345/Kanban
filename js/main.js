let eventBus = new Vue()
Vue.component('Notes', {
    template: `
       <div class="Notes">
           <note-add></note-add>
           <div class="all-cards">
                <div class="note">
                    <h2>New task</h2>
                    <columnOne :noteOne="noteOne"></columnOne>
                </div>
                <div class="note">
                    <h2>Task in progress</h2>
                    <columnTwo :noteTwo="noteTwo"></columnTwo>
                </div>
                <div class="note">
                    <h2>Completed tasks</h2>
                    <columnThree :noteThree="noteThree"></columnThree>
                </div>
           </div>
       </div>`,
    data() {
        return {
            noteOne:[],
            noteTwo:[],
            noteThree:[],
        }
    },
    mounted() {
        eventBus.$on('firstColumn', noteCard => {
            if(this.noteOne.length < 3){
                this.noteOne.push(noteCard)

                console.log(this.noteOne)
            }
        })
        eventBus.$on('secondColumn', noteCard => {
            if(this.noteTwo.length != null){
                this.noteTwo.push(noteCard)
                this.noteOne.splice(this.noteOne.indexOf(noteCard), 1)
                console.log(this.noteTwo)
            }

        })
        eventBus.$on('thirdColumn', noteCard => {
            this.noteThree.push(noteCard)
            this.noteTwo.splice(this.noteTwo.indexOf(noteCard), 1)
            console.log(this.noteTwo)
            console.log(this.noteThree)
        })
        // eventBus.$on('fromFirstColumnToThird', noteCard => {
        //     this.noteThree.push(noteCard)
        //     this.noteOne.splice(this.noteOne.indexOf(noteCard), 1)
        //
        // })

    },


})
Vue.component('columnOne', {
    template: `
       <div class="column">
                <div class="column-one" v-for="column in noteOne">
                <h3>{{column.name}}</h3>
                    <span>
                        <li v-for="task in column.arrayOfTasks" v-if="task.title != null" >
                                <strong>{{task.id}}</strong>
                                <input type="checkbox" 
                                v-on:click="task.completed = true"
                                v-on:click='column.status += 1'>
                                <span :class="{done: task.completed}" >{{task.title}}</span>
                        </li>
                        <input
                            value="Change"
                            class="btn-del"
                            type="button"
                            @click="Changing">
                        <input
                            value="Delete"
                            class="btn-del"
                            type="button"
                            @click="DeleteNote">
                    </span>
                </div>
       </div>`,
    methods: {
        DeleteNote(noteCard){
            this.noteOne.splice(this.noteOne.indexOf(noteCard), 1)
            console.log(noteCard)
        },
        Changing(noteCard){
            eventBus.$emit('secondColumn', noteCard)
        }
    },
    props: {
        noteOne:{
            type: Array,
            required: false

        },
    },

})
Vue.component('columnTwo', {
    template: `
       <div class="column">
                <div class="column-one" v-for="column in noteTwo">
                <h3>{{column.name}}</h3>
                    <span>
                        <li v-for="task in column.arrayOfTasks" v-if="task.title != null" >
                                <strong>{{task.id}}</strong>
                                <input type="click" 
                                v-on:click="task.completed = true"
                                v-on:click='column.status += 1'>
                                <span :class="{done: task.completed}" >{{task.title}}</span>
                        </li>
                        <input
                            value="Change"
                            class="btn-del"
                            type="button"
                            @click="changeColTwo">
                    </span>
                </div>
       </div>`,
    props: {
        noteTwo:{
            type: Array,
            required: false

        }

    },
    methods: {
        changeColTwo(noteCard) {
                eventBus.$emit('thirdColumn', noteCard)
            }

        },

})
Vue.component('columnThree', {
    template: `
       <div class="column-one">
            <div class="column-one" v-for="column in noteThree">
            <h3>{{column.name}}</h3>
                <span>
                    <li v-for="task in column.arrayOfTasks" v-if="task.title != null" :class="{BackgroundThree: task.title != null}">
                            <strong>{{task.id}}</strong>
                            <input type="checkbox" 
                            :disabled="task.completed" 
                            >
                            <span :class="{done: task.completed}" >{{task.title}}</span>
                    </li>
                    <p>Date of the problem solution: <br>{{column.date}}</p>
                </span>
            </div>
       </div>`,
    props: {
        noteThree:{
            type: Array,
            required: false

        }

    },

})
Vue.component('note-add', {
    template: `
       
       <div>
       <form class="note-form">
            <label for="name" class="form-label">Name of the note</label>
           <input class="form-input" id="task" v-model="name" maxlength="50" required placeholder="task">
            <div class="name-column">
                <label for="name" class="form-label">Add note:</label>
                <input class="form-input" id="task1" v-model="task1" maxlength="50" required placeholder="task">
            </div>
            <div class="name-column">
                <label for="name" class="form-label">Add note:</label>
                <input class="form-input" id="task2" v-model="task2" maxlength="50" required placeholder="task">
            </div>
            <div class="name-column">
                <label for="name" class="form-label">Add note:</label>
                <input class="form-input" id="task3" v-model="task3" maxlength="50" required placeholder="task">
            </div>
            <div class="name-column">
                <label for="name" class="form-label">Add note:</label>
                <input class="form-input" id="task4" v-model="task4" maxlength="50" placeholder="task">
            </div>
            <div class="name-column">
                <label for="name" class="form-label">Add note:</label>
                <input class="form-input" id="task5" v-model="task5" maxlength="50" placeholder="task">
            </div>
            <input @click="onSubmit" class="btn" type="button" value="Create"> 
       </form>
       </div>`,

    data() {
        return {
            name: null,
            task1:null,
            task2:null,
            task3:null,
            task4:null,
            task5:null,
        }
    },
    methods: {
        onSubmit() {
            let noteCard = {
                name: this.name,
                arrayOfTasks: [ {id: 1, title: this.task1, completed: false},
                    {id: 2, title: this.task2, completed: false},
                    {id: 3, title: this.task3, completed: false},
                    {id: 4, title: this.task4, completed: false},
                    {id: 5, title: this.task5, completed: false},
                ],
                date: null,
                status: 0

            }

            eventBus.$emit('firstColumn', noteCard),
                this.name = null,
                this.arrayOfTasks = null,
                this.task1 = null,
                this.task2 = null,
                this.task3 = null,
                this.task4 = null,
                this.task5 = null
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
        name: "Notes application"
    },

})