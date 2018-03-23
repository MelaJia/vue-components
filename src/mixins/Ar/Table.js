export default{
    data() {
        return {
            Options: [{
                value: '大吉制造',
                label: '大吉制造'
              }, {
                value: '大诚制造',
                label: '大诚制造'
              }, {
                value: '大利制造',
                label: '大利制造'
              }],
              // 宽度控制
              widthArr:{
                id: '100',
                come: '',
                company: '150',
                status: '',
                moneyType: '',
                money: '',
                money_can: '',
                money_cash: '',
                arriveDate: '120',
              },
          tableData5: [{
          pend:false, //父节点展开属性 默认false
          id: '12987122',
          come: '自有',
          company: '大诚制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '20000',
          money_cash: '20000',
          arriveDate: '2017-9-26',
          bankAccount:'2000300040005000',
          bankCompaney:'招商',
          tableData: [{  //子节点
          id: '12987122-1',
          come: '自有',
          company: '大吉制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '20000',
          money_cash: '20000',
          arriveDate: '2017-9-26',
          bankAccount:'2000300040005000',
          bankCompaney:'招商',
        }, {
          id: '12987122-2',
          come: '自有',
          company: '大诚制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '20000',
          money_cash: '20000',
          arriveDate: '2017-9-26',
          bankAccount:'2000300040005000',
          bankCompaney:'招商',
        }, {
          id: '12987122-3',
          come: '自有',
          company: '大诚制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '20000',
          money_cash: '20000',
          arriveDate: '2017-9-26',
          bankAccount:'2000300040005000',
          bankCompaney:'招商',
        }]
        }, {
          pend:false, //父节点展开属性
          id: '12987123',
          come: '自有',
          company: '大诚制造',
          status: '待确认',
          moneyType: '人民币',
          money: '30000',
          money_can: '20000',
          money_cash: '20000',
          arriveDate: '2017-9-26',
          bankAccount:'2000300040005000',
          bankCompaney:'招商',
          tableData: [{  //子节点
            id: '12987122-1',
            come: '自有',
            company: '大吉制造',
            status: '待确认',
            moneyType: '人民币',
            money: '20000',
            money_can: '20000',
            money_cash: '20000',
            arriveDate: '2017-9-26',
            bankAccount:'2000300040005000',
            bankCompaney:'招商',
          }]
        }]
        }
      },
      methods: {
      tableRowClassName({row, rowIndex}) {
        if (row.pend) {
          return 'warning-row';
        } 
        return '';
      },
      expendhandle(row, expandedRows){
        console.log(expandedRows)
        row.pend=!row.pend;
      },
      getPendedColor({row, rowIndex}){
        return 'expendcolor';
      },
      handleInfo(rowIndex, row){
        console.log(rowIndex)
        console.log(row)
      },
      // 父table控制子table宽度控制
      widthHandle(newWidth, oldWidth, column, event){
        this.widthArr[column.property]=newWidth;
      }
    },
}