Page({
    data: {
        initData: {
            distance: 1000,
            time: 800,
            fuzai: 50,
            weight: 1,
            parseTime: 0,
            saveForce: 0,
            force: 0,
            saveLevel:1.4
        },
        distance: '',
        time: '',
        fuzai: '',
        weight: '',
        parseTime: '',
        saveForce: '',
        force: '',
        saveLevel:'',
        // inputData: {
        //     distance: '',
        // },
        // countData: {
        //     acceleration: 0,
        //     speed: 0,
        //     speedForce: 0,
        //     topForce: 0,
        //     durForce: 0,
        //     saveLevel: 0
        // },
        acceleration: 0,
        speed: 0,
        speedForce: 0, //加速推力
        downForce: 0, //减速推力
        topForce: 0, //峰值推力
        durForce: 0,
        // saveLevel: 0,
        todos: [],
        leftCount: 0,
        allCompleted: false,
        index: []
    },

    clickReset: function () {
        let input = {}

        Object.assign(input, ...this.data.initData)
        var  acceleration = '0.637755102040'
        var  speed = '2.5'
        var  speedForce = '328.75'
        var  downForce = '308.75'
        var  topForce = '328.75'
        var  durForce = '318.90682411665'
        this.setData(
            {
                distance :this.data.initData.distance,
                time:this.data.initData.time,
                fuzai:this.data.initData.fuzai,
                weight: this.data.initData.weight,
                parseTime: this.data.initData.parseTime,
                saveForce: this.data.initData.saveForce,
                force: this.data.initData.force,
                saveLevel: this.data.initData.saveLevel,
                acceleration: acceleration,
                speed: speed,
                speedForce: speedForce,
                downForce: downForce,
                topForce: topForce,
                durForce: durForce

            })
        // this.data.distance = this.data.initData.distance
    },
    clickClean: function () {
        var tmp = 0
        this.setData(
            {
                distance :'',
                time:'',
                fuzai:'',
                weight: '',
                parseTime: '',
                saveForce: '',
                force: '',
                saveLevel: '',
                acceleration: tmp,
                speed: tmp,
                speedForce: tmp,
                downForce: tmp,
                topForce: tmp,
                durForce: tmp

            })
    },
    clickCustom: function() {
        let acceleration = 0
        let speed = 0
        let speedForce = 0 // 加速推力
        let downForce = 0 // 减速推力
        let topForce = 0  //峰值推力
        let durForce = 0  //持续推力

        if(this.data.distance && this.data.time){
            let base = this.data.time/2000
            acceleration = (this.data.distance/1000)/Math.pow(base,2)/9.8
        }
        if(acceleration){
            speed = acceleration*9.8*this.data.time/2000
        }
        //  let speedForce; // 加速推力
        if(this.data.fuzai && this.data.weight && acceleration && this.data.force){
            speedForce = (this.data.fuzai + this.data.weight) * acceleration *9.8 + this.data.force
        }
        //  let downForce;  // 减速推力
        if(this.data.fuzai && this.data.weight && acceleration && this.data.force){
            downForce = (this.data.fuzai + this.data.weight) * acceleration *9.8 + this.data.force
        }
        //   let topForce: 0, //峰值推力
        if(downForce && speedForce){
            topForce = Math.max(downForce,speedForce)
        }
        //  let durForce: 0, //峰值推力
        if(downForce && speedForce && this.data.time && this.data.parseTime && this.data.saveForce){
            let x = Math.pow(speedForce,2) * this.data.time/2000 + Math.pow(downForce,2) * this.data.time/2000
                + Math.pow(this.data.saveForce,2) * this.data.parseTime/1000
            let y = (this.data.time + this.data.parseTime)/1000
            var num = x/y
            durForce = Math.sqrt(num)
        }
        this.setData(
            {
                acceleration: acceleration,
                speed: speed,
                speedForce: speedForce,
                downForce: downForce,
                topForce: topForce,
                durForce: durForce
            })


    },
    inputChangeDistance: function(e) {
        this.setData({
            distance:e.detail.value
        })
    },
    inputChangeTime: function(e) {
        this.setData({
            time:e.detail.value
        })
    },
    inputChangeFuzai: function(e) {
        this.setData({
            fuzai:e.detail.value
        })
    },
    inputChangeWeight: function(e) {
        this.setData({
            weight:e.detail.value
        })
    },
    inputChangeParseTime: function(e) {
        this.setData({
            parseTime:e.detail.value
        })
    },
    inputChangeSaveForce: function(e) {
        this.setData({
            saveForce:e.detail.value
        })
    },
    inputChangeForce: function(e) {
        this.setData({
            force:e.detail.value
        })
    },
    inputChangeSaveLevel: function(e) {
        this.setData({
            saveLevel:e.detail.value
        })
    },

    save: function () {
        wx.setStorageSync('todo_index', this.data.index)
        wx.setStorageSync('todo_list', this.data.todos)

    },

    load: function () {
        var todos = wx.getStorageSync('todo_list')
        if (todos) {
            var leftCount = todos.filter(function (item) {
                return !item.completed
            }).length
            this.setData({ todos: todos, leftCount: leftCount })
        }
        var index = wx.getStorageSync('todo_index')
        if (index) {
            this.setData({ index: index })
        }
    },

    onLoad: function () {
        this.load()
    },

    inputChangeHandle: function (e) {
        this.setData({inputData: e.detail.value })
    },

    addTodoHandle: function (e) {
        if (!this.data.input || !this.data.input.trim()) return
        var todos = this.data.todos
        todos.push({ name: this.data.input, completed: false })
        var index = this.data.index
        index.push({ timestamp: new Date(), action: 'Add', name: this.data.input })
        this.setData({
            input: '',
            todos: todos,
            leftCount: this.data.leftCount + 1,
            index: index
        })
        this.save()
    },

    toggleTodoHandle: function (e) {
        var index = e.currentTarget.dataset.index
        var todos = this.data.todos
        todos[index].completed = !todos[index].completed
        var index = this.data.index
        index.push({
            timestamp: new Date(),
            action: todos[index].completed ? 'Finish' : 'Restart',
            name: todos[index].name
        })
        this.setData({
            todos: todos,
            leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1),
            index: index
        })
        this.save()
    },

    toggleAllHandle: function (e) {
        this.data.allCompleted = !this.data.allCompleted
        var todos = this.data.todos
        for (var i = todos.length - 1; i >= 0; i--) {
            todos[i].completed = this.data.allCompleted
        }
        var index = this.data.index
        index.push({
            timestamp: new Date(),
            action: this.data.allCompleted ? 'Finish' : 'Restart',
            name: 'All todos'
        })
        this.setData({
            todos: todos,
            leftCount: this.data.allCompleted ? 0 : todos.length,
            index: index
        })
        this.save()
    },

    clearCompletedHandle: function (e) {
        var todos = this.data.todos
        var remains = []
        for (var i = 0; i < todos.length; i++) {
            todos[i].completed || remains.push(todos[i])
        }
        var index = this.data.index
        index.push({
            timestamp: new Date(),
            action: 'Clear',
            name: 'Completed todo'
        })
        this.setData({ todos: remains, index: index })
        this.save()
    }
})
