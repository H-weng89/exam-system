<template>
    <div class="wra">
        <div class="header">
            <!-- <div class="myExam">消息同通知</div> -->
           
            <div :class="{'ing':1,'chosen':1}">系统通知</div>
            <!-- <div :class="{'end':1,}">系统通知</div> -->
        </div>
        <div class="second">
          
            <div class="search">
                 消息内容：<a-input-search
      v-model:value="value"
      placeholder="请输入"
      style="width: 250px"
      @search="onSearch"
    />
            </div>
        <div class="bt"><a-button type="primary" style="
    border-radius: 4px;
    width: 100px;
    background-color:#5784ff;
" @click="start(1)">发布通知</a-button></div>
        </div>
        <div class="main">
        <a-table :columns="columns" :data-source="data" :pagination="{pageSize:8}"  rowKey="account">
    <template #action="{record}">
      <div class="operate">
 <a @click="toDetail(record)"> 查看 </a>
      <a @click="start(1)">编辑 </a>
      <a>删除</a>
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
export default defineComponent({
 
  
  setup() {
    //查看题库
    function toDetail(record){
      console.log(record)
      router.push({path:'/tikuDetail',query:{key:record}})
      
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
    onMounted(()=>{
      //根据key获取数据
      key.value = route.query.key
    })
   const columns = ref([{
      title: '具体通知',
      width: 200,
      dataIndex: 'name',
      ellipsis: true,
      key: 'name',
      fixed: 'left',
     
    }, {
      title: '发布者',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
     
    },
    {
      title: '发布时间',
      width: 50,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
     
    },
       ]);
    const data = [
     

    ];

    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
        // operation:'进入考试'
        
      });
    }
    
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