<template>
    <div class="wra">
        <div class="header">
            <div class="myExam">我的考试</div>
           
            <!-- <div :class="{'ing':1,'chosen':1}">试题管理</div>
            <div :class="{'end':1,}">题库管理</div> -->
        </div>
        <div class="second">
          
            <div class="search">
                 学科：<a-input-search
      v-model:value="value"
      placeholder="请输入"
      style="width: 250px"
      @search="onSearch"
    />
            </div>
            <!-- <div class="bt"><a-button type="primary" style="
    border-radius: 4px;
    width: 100px;
    background-color:#5784ff;
" @click="toDetail(1)">添加试卷</a-button></div> -->
        </div>
        <div class="main">
        <a-table :columns="columns" :data-source="data" :pagination="{pageSize:8}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
 <a @click="toDetail(record)" style="color:#45d793" v-if="record.points=='未开始'">进入考试</a>
  <a @click="toDetail(record)"  style="color:#45d793" v-else>无</a>
      <!-- <a @click="start(1)" style="color:#ffbb65">编辑 </a>
      <a style="color:#dc5716">删除</a> -->
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
import api from '../api/axios.js'
export default defineComponent({
 
  
  setup() {
    //查看题库
    function toDetail(record){
      console.log(toDetail)
      
      router.push({path:'/start',query:{exam:JSON.stringify(record)}})
      
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
onBeforeRouteUpdate(async to => {
     key.value = to.query.key
     //获取考试
     let result = await api.getExamS()
      console.log(result)
       let  exam = result.data.data
       console.log(exam)
       let list = []
       if(key.value==2){
          
       exam.forEach(item=>{
 
          let i = item.exam
           i.scores = item.scores
           i.points = item.points
           if(i.points==0){
             i.points='未开始'
          
  list.push(i)
           }

         
       })

       }
           if(key.value==3){
     
       exam.forEach(item=>{
 
          let i = item.exam
           i.scores = item.scores
           i.points = item.points
           if(i.points!=0){
  list.push(i)
           }

         
       })

       }
        
    

       data.value = list
            
});
let data = ref([])
    onMounted(async ()=>{
      //根据key获取数据
      key.value = route.query.key

      //获取考试
      // let result = await api.getExamS()
      // console.log(result)
      //  let  exam = result.data.data
       
      //  let  list = []
      //  exam.forEach(item=>{
      //     let i = item.exam
      //      i.scores = item.scores
      //      list.push(i)
      //  })

      //  data.value = list


    })
   const columns = ref([{
      title: '考试名称',
      width: 100,
      dataIndex: 'name',
      ellipsis: true,
      key: 'name',
      fixed: 'left',
     
    },
    {
      title: '考试时间',
      width: 200,
      dataIndex: 'startTime',
      key: 'startTime',
      fixed: 'left',
     
    },
    {
      title: '考试时长',
      width: 100,
      dataIndex: 'duration',
      key: 'duration',
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
      title: '考试次数',
      dataIndex: 'chance',
      key: 'chance',
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
    }, 
     {
      title: '我的得分',
      width: 100,
      dataIndex: 'points',
      key: 'points',
      fixed: 'left',
      align:'center'
     
    }, ]);
 


    
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