Page({
    data: {
        input: '',
        todos: [],
        leftCount: 0,
        allCompleted: false,
        index: []
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
        this.setData({ input: e.detail.value })
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

    removeTodoHandle: function (e) {
        var index = e.currentTarget.dataset.index
        var todos = this.data.todos
        var remove = todos.splice(index, 1)[0]
        var index = this.data.index
        index.push({ timestamp: new Date(), action: 'Remove', name: remove.name })
        this.setData({
            todos: todos,
            leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
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
