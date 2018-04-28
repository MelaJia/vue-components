export default {
    data() {
        return {
            selectData: {
                origin: [{
                    lable: '自有AR',
                    value: '自有AR'
                }, {
                    lable: '购入AR',
                    value: '购入AR'
                }],
                status: [{
                    lable: '待确认',
                    value: '待确认'
                }, {
                    lable: '可用',
                    value: '可用'
                }, {
                    lable: '不可用',
                    value: '不可用'
                }],
                moneyType: [{
                    lable: '人民币',
                    value: '人民币'
                }, {
                    lable: '台币',
                    value: '台币'
                }, {
                    lable: '港币',
                    value: '港币'
                }, {
                    lable: '美元',
                    value: '美元'
                }]
            },
            formInline: {
                id: '',
                department: '',
                status: '',
                moneyType: '',
                moneyDate: []
            }
        }
    },
    methods: {
        onSubmit() {
            console.log(this.formInline);
            console.log('submit!');
        }
    }
}