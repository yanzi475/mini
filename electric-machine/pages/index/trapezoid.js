Page({
    data: {
        initData: {
            distance: 500, // 行程
            acceleration: 0.2, //加速度
            maxAcc: 1.5, // 最大速度
            evenAcc: 1.5, // 匀速度
            deceleration: 1.5, // 减速度
            weight: 1, // 动子重量
            fuzai: 150, // fuzai
            elecWeight: 3, //电磁吸力
            forceLevel: 0.005, // 摩擦系数
            saveLevel: 0,  // 安全系数
            forceHua: 1, // 滑块摩擦力
            forceChen: 150, // 防尘罩阻力
            forceLian: 3, //拖链阻力
            parseTime: 0.005, // 停顿时间
            saveForce: 0  // 保持力
        },
        distance: '', // 行程
        acceleration: '', //加速度
        maxAcc: '', // 最大速度
        evenAcc: '', // 匀速度
        deceleration: '', // 减速度
        weight: '', // 动子重量
        fuzai: '', // fuzai
        elecWeight: '', //电磁吸力
        forceLevel: '', // 摩擦系数
        saveLevel: '',  // 安全系数
        forceHua: '', // 滑块摩擦力
        forceChen: '', // 防尘罩阻力
        forceLian: '', //拖链阻力
        parseTime: '', // 停顿时间
        saveForce: '',  // 保持力

        accTime: 0, //加速时间
        accDis : 0, //加速位移
        aveTime: 0, //匀速时间
        aveDis : 0, //匀速位移
        delTime: 0, //减速时间
        delDis : 0, //减速位移
        forceMax:0, //匀速时总摩擦力
        sumTime: 0,//运动总时间
        durForceOne: 0, // 持续推力1
        durForceTwo: 0, // 持续推力2
        speedForce: 0, //加速推力
        downForce: 0, //减速推力
        maxForce: 0, //最大推力
        topForce: 0, //峰值推力

        // saveLevel: 0,
        todos: [],
        leftCount: 0,
        allCompleted: false,
        index: []
    },

    clickReset: function () {
        let input = {}

        Object.assign(input, ...this.data.initData)

        var accTime = 0.76530612244898 //加速时间
        var  accDis = 573.979591836735 //加速位移
        var  aveTime = -0.431972789115646 //匀速时间
        var  aveDis = -647.959183673469 //匀速位移
        var  delTime =  0.76530612244898 //减速时间
        var  delDis = 573.979591836735 //减速位移
        var  forceMax = 25.755 //匀速时总摩擦力
        var  sumTime = 1.09863945578231//运动总时间
        var  durForceOne = 208.572580896265 // 持续推力1
        var   durForceTwo = 271.144355165144 // 持续推力2
        var  speedForce = 321.715 //加速推力
        var downForce = 270.205  //减速推力
        var maxForce = 321.715//最大推力
        var  topForce =  418.2295//峰值推力

        this.setData(
            {
                distance :this.data.initData.distance,
                acceleration:this.data.initData.acceleration,
                maxAcc:this.data.initData.maxAcc,
                evenAcc: this.data.initData.evenAcc,
                deceleration: this.data.initData.deceleration,
                weight: this.data.initData.weight,
                fuzai: this.data.initData.fuzai,
                elecWeight: this.data.initData.elecWeight,
                forceLevel: this.data.initData.forceLevel,
                forceHua: this.data.initData.forceHua,
                forceChen: this.data.initData.forceChen,
                saveLevel: this.data.initData.saveLevel,
                forceLian: this.data.initData.forceLian,
                parseTime: this.data.initData.parseTime,
                saveForce: this.data.initData.saveForce,

                accTime : 0.76530612244898, //加速时间
                accDis : 573.979591836735 ,//加速位移
                aveTime : -0.431972789115646, //匀速时间
                aveDis : -647.959183673469, //匀速位移
                delTime :  0.76530612244898 ,//减速时间
                delDis : 573.979591836735, //减速位移
                forceMax : 25.755, //匀速时总摩擦力
                sumTime : 1.09863945578231,//运动总时间
                durForceOne : 208.572580896265 ,// 持续推力1
                durForceTwo : 271.144355165144, // 持续推力2
                speedForce : 321.715, //加速推力
                downForce : 270.205,  //减速推力
                maxForce : 321.715,//最大推力
                topForce :  418.2295  //峰值推力
            })
        // this.data.distance = this.data.initData.distance
    },
    clickClean: function () {
        var tmp = 0
        this.setData(
            {
                distance :'',
                acceleration:'',
                maxAcc:'',
                evenAcc: '',
                deceleration: '',
                weight: '',
                fuzai: '',
                elecWeight: '',
                forceLevel: '',
                forceHua: '',
                forceChen: '',
                saveLevel: '',
                forceLian: '',
                parseTime: '',
                saveForce: '',

                accTime : tmp, //加速时间
                accDis : tmp ,//加速位移
                aveTime : tmp, //匀速时间
                aveDis : tmp, //匀速位移
                delTime :  tmp ,//减速时间
                delDis : tmp, //减速位移
                forceMax : tmp, //匀速时总摩擦力
                sumTime : tmp,//运动总时间
                durForceOne : tmp ,// 持续推力1
                durForceTwo : tmp, // 持续推力2
                speedForce : tmp, //加速推力
                downForce : tmp,  //减速推力
                maxForce : tmp,//最大推力
                topForce :  tmp  //峰值推力

            })
    },
    clickCustom: function() {
        var accTime = 0  //加速时间
        var  accDis = 0  //加速位移
        var  aveTime = 0  //匀速时间
        var  aveDis = 0  //匀速位移
        var  delTime =  0   //减速时间
        var  delDis = 0   //减速位移
        var  forceMax = 0   //匀速时总摩擦力
        var  sumTime = 0  //运动总时间
        var  durForceOne = 0  // 持续推力1
        var   durForceTwo = 0  // 持续推力2
        var  speedForce = 0  //加速推力
        var downForce = 0   //减速推力
        var maxForce = 0    //最大推力
        var  topForce = 0  //峰值推力
        // 加速
        if(this.data.maxAcc && this.data.acceleration){
            accTime = (this.data.maxAcc/this.data.acceleration)/9.8
        }
        if(accTime){
            accDis = 0.5 * this.data.acceleration * 9.8 * Math.pow(accTime,2) * 1000
        }
        // 减速
        if(this.data.evenAcc && this.data.deceleration) {
            delTime = this.data.evenAcc / this.data.deceleration /9.8
        }
        if(this.data.evenAcc && delTime ) {
            delDis = 0.5* this.data.evenAcc * delTime *1000
        }
        //  匀速
        if(this.data.distance && accDis && delDis ){
            aveDis = this.data.distance - accDis - delDis
        }
        if(this.data.evenAcc && aveDis ){
            aveTime = aveDis/1000/this.data.evenAcc
        }

        // weight: '', // 动子重量
        //     fuzai: '', // fuzai
        //     elecWeight: '', //电磁吸力
        //     forceLevel: '', // 摩擦系数
        //     saveLevel: '',  // 安全系数
        //     forceHua: '', // 滑块摩擦力
        //     forceChen: '', // 防尘罩阻力
        //     forceLian: '', //拖链阻力
        //     parseTime: '', // 停顿时间
        //     saveForce: '',  // 保持力


        //  匀速时总摩擦力
        if(this.data.weight && this.data.fuzai && this.data.elecWeight && this.data.forceLevel && this.data.forceHua && this.data.forceChen && this.data.forceLian ){
            forceMax = (+this.data.weight + (+this.data.fuzai) + (+this.data.elecWeight) *1000)* this.data.forceLevel + (+this.data.forceHua) + (+this.data.forceChen) + (+this.data.forceLian)
        }
        // forceMax = (this.data.weight + this.data.fuzai + this.data.elecWeight *1000)* this.data.forceLevel + this.data.forceHua + this.data.forceChen + this.data.forceLian
        //   运动总时间
        sumTime = accTime + delTime + aveTime
        if(this.data.weight && this.data.fuzai  && this.data.acceleration && forceMax) {
            speedForce = ((+this.data.weight) + (+this.data.fuzai)) * (+this.data.acceleration) *9.8 + forceMax
        }
        if(this.data.weight && this.data.fuzai  && this.data.deceleration && forceMax) {
            downForce = ((+this.data.weight) + (+this.data.fuzai)) * (+this.data.deceleration) *9.8 - forceMax
        }
        if(speedForce && downForce) {
            maxForce = Math.max(speedForce, downForce)
        }
        if(speedForce && accTime && forceMax && aveTime && downForce && delTime &&this.data.saveForce && this.data.parseTime ) {
            let temp = Math.pow(speedForce, 2)* accTime + Math.pow(forceMax, 2)* aveTime + Math.pow(downForce, 2)* delTime + Math.pow((+this.data.saveForce), 2)* this.data.parseTime
            let x = temp / (accTime + aveTime + delTime + (+this.data.parseTime) )
            durForceOne = Math.sqrt(x)
        }
        if(maxForce && this.data.saveLevel ) {
            topForce = maxForce * (+this.data.saveLevel)
        }
        if(durForceOne && this.data.saveLevel ) {
            durForceTwo = durForceOne * (+this.data.saveLevel)
        }
        this.setData(
            {
                accTime: accTime, //加速时间
                accDis: accDis, //加速位移
                aveTime: aveTime,  //匀速时间
                aveDis: aveDis,  //匀速位移
                delTime: delTime,   //减速时间
                delDis: delDis,   //减速位移
                forceMax: forceMax,   //匀速时总摩擦力
                sumTime: sumTime,  //运动总时间
                durForceOne: durForceOne,  // 持续推力1
                durForceTwo: durForceTwo,  // 持续推力2
                speedForce: speedForce, //加速推力
                downForce: downForce,  //减速推力
                maxForce: maxForce,    //最大推力
                topForce: topForce  //峰值推力
            })
    },


    inputChangeDistance: function(e) {
        this.setData({
            distance:e.detail.value
        })
    },

    inputChangeAcceleration: function(e) {
        this.setData({
            acceleration:e.detail.value
        })
    },
    inputChangeMaxAcc: function(e) {
        this.setData({
            maxAcc:e.detail.value
        })
    },
    inputChangeEvenAcc: function(e) {
        this.setData({
            evenAcc:e.detail.value
        })
    },
    inputChangedeceleration: function(e) {
        this.setData({
            deceleration:e.detail.value
        })
    },
    inputChangefuzai: function(e) {
        this.setData({
            fuzai:e.detail.value
        })
    },
    inputChangeelecWeight: function(e) {
        this.setData({
            elecWeight:e.detail.value
        })
    },
    inputChangeforceLevel: function(e) {
        this.setData({
            forceLevel:e.detail.value
        })
    },
    inputChangeforceHua: function(e) {
        this.setData({
            forceHua:e.detail.value
        })
    },
    inputChangeforceChen: function(e) {
        this.setData({
            forceChen:e.detail.value
        })
    },
    inputChangeforceLian: function(e) {
        this.setData({
            forceLian:e.detail.value
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
