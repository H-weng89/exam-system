<template>
    <div class="wra">
        <div class="header">
            <div class="myExam">批改试卷</div>
           
            <!-- <div :class="{'ing':1,'chosen':1}">试题管理</div>
            <div :class="{'end':1,}">题库管理</div> -->
        </div>
        <div class="second">
          
            <div class="search">
                 学生名称：<a-input-search
      v-model:value="value"
      placeholder="请输入"
      style="width: 250px"
      @search="onSearch"
    />
            </div>
    
        </div>
        <div class="main">
        <a-table :columns="columns" :data-source="data" :pagination="{pageSize:8}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
 <a @click="toDetail(1,record)" style="color:#45d793" v-if="record.points=='未批改'">批改试卷</a>

       <a  style="color:#ffbb65" v-else>已批改 </a>
      <!-- <a style="color:#dc5716">删除</a> --> 
      </div>
     
    </template>
  </a-table>
         

  
        </div>
         <a-modal v-model:visible="visible" title="题库详情" @ok="handleOk" cancelText="取消" okText="确定" >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    </div>
</template>

<script>
//假数据




import {useRoute,onBeforeRouteUpdate,useRouter} from 'vue-router'
import { defineComponent, ref,onMounted} from 'vue';
import api from '../api/axios'
export default defineComponent({
 
  
  setup() {
    //查看题库
    function toDetail(i,record){

      console.log(record)
        if(i==1){
          router.push({path:'/checkPaper',query:{main:JSON.stringify(record.main),other:JSON.stringify(record)}})
        }
      
    }
    //对话框
     const visible = ref(false);
    function start(i){
      i
      
      visible.value = true
    }
    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };
    //判断
    let route = useRoute()
    let router = useRouter()
    let key = ref(route.query.key)
onBeforeRouteUpdate(to => {
     key.value = to.query.key
});

let data = ref([])
    onMounted(async ()=>{
      //根据key获取数据
      key.value = JSON.parse(route.query.main).id
      let main = JSON.parse(route.query.main)
      console.log(main)
      let result = await api.getExamFstudent(key.value)
      result.data.data.forEach(item=>{
       
        let person = {}
        person.examName = main.name
        person.time = main.startTime
        person.scores = main.scores
        person.points = item.points==0?'未批改':item.points
        person.uid = item.uid
        person.id = key.value
        if(item.examPaper){
  person.main = JSON.parse(item.examPaper)
        }
        else{
          return
        }
      
        data.value.push(person)


      })
      console.log(data.value)


    })
   const columns = ref([{
      title: '考试名称',
      width: 100,
      dataIndex: 'examName',
      ellipsis: true,
      key: 'examName',
      fixed: 'left',
     
    },
    {
      title: '考试时间',
      width: 100,
      dataIndex: 'time',
      key: 'time',
      fixed: 'left',
     
    },
    
      
    {
      title: '，考试总分',
      dataIndex: 'scores',
      key: 'scores',
      width: 150,
      align: 'center'
    },
    {
      title: '得分',
      dataIndex: 'points',
      key: 'points',
      width: 150,
      align: 'center'
    },
     {
     title:'操作',
      key: 'operation',
      dataIndex:'operation',
      align: 'center',
       slots: {
      customRender: 'action',
    },
      
    
      width: 100,
    },  ]);
   


  //学科选择和搜索
const value = ref('');

    const onSearch = searchValue => {
      console.log('use value', searchValue);
      console.log('or use this.value', value.value);
    };

    const focus = () => {
      console.log('focus');
    };

    const handleChange = value => {
      console.log(`selected ${value}`);
    };
    //表格

    return {
      focus,
      handleChange,
      value,
      onSearch,
 data,
 columns,
 key,
 start,
 handleOk,
 visible,
 toDetail
    
 
 
    
    };
  },

});


</script>

<style lang="less" scoped>
.wra{
    width: 98% !important;
    height: 95% !important;
  
    background-color: #eceff8;
    margin: auto;
    margin-top: 20px;
    .header{
        width: 40%;
        height: 7%;
        display: flex;
       
        justify-content: flex-start;
        margin-left: 20px;
        align-items: center;
        font-size: 20px;
        margin-bottom: 10px;
        
        .chosen{
          color: #3a4167;
          font-weight: 500;
        }
        .myExam{
            font-size: 20px;
            color: black;
        }
    }

    .second{
        align-items: center;
        margin-top: 10px;
        width: 98%;
        height: 65px;
        display: flex;
        justify-content: space-between;
        margin: auto;
        border-radius: 5px;
        background-color: white;
        margin-bottom: 10px;
        .bt{
          border-radius: 10px;
          margin-right: 20px;
        }

        .search{
          span{
 color: #3a4167;
          }
         
          margin-left: 20px;
        }
    }
    .main{
        width: 98%;
        height: 83%;
        color: #3a4167 !important;
        margin:auto;
        /deep/.ant-table-tbody > tr > td:nth-child(6){
         

        }
        /deep/.ant-table-thead > tr:first-child > th{
          background-color:#f6f7fc ;
        }
        .operate{
          display: flex;
          justify-content: space-around;
        }
         /deep/.ant-table-tbody > tr > td:nth-child(6):hover{
           cursor: pointer;
         }
       
        
    }
}

</style>