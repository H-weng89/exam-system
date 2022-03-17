<template>
    <div class="wra">
        <div class="header">
            <div class="myExam">我的题库:xxx题库</div>
           
          
        </div>
        <div class="second">
          
            <div class="search">
                 题目：<a-input-search
      v-model:value="value"
      placeholder="请输入"
      style="width: 250px"
      @search="onSearch"
    />
            </div>
        
        </div>
        <div class="main">
        <a-table :columns="columns" :data-source="data" :pagination="{pageSize:8}"  rowKey="account">
    <template #action>
        <div class="opetate">
 <a @click="toDetail(record)" style="color:#45d793">查看</a>
      <a @click="start(1)" style="color:#ffbb65">编辑</a>
      <a style="color:#dc5716">删除</a>
        </div>
    
    </template>
  </a-table>
         

  
        </div>
         <a-modal v-model:visible="visible" title="考试详情" @ok="handleOk" cancelText="取消" okText="确定" >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    </div>
</template>

<script>
//假数据




import {useRoute,onBeforeRouteUpdate} from 'vue-router'
import { defineComponent, ref,onMounted} from 'vue';
export default defineComponent({
 
  
  setup() {
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
    let key = ref(route.query.key)
onBeforeRouteUpdate(to => {
     key.value = to.query.key
});
    onMounted(()=>{
      //根据key获取数据
      key.value = route.query.key
    })
   const columns = ref([{
      title: '题干',
      width: 100,
      dataIndex: 'name',
      ellipsis: true,
      key: 'name',
      fixed: 'left',
     
    }, {
      title: '题目类型',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
     
    },
     {
     title:'操作',
      key: 'operation',
      dataIndex:'operation',
     
      align: 'center',
       slots: {
      customRender: 'action',
    },
      
    
      width: 50,
    }, ]);
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
 visible
    
 
 
    
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
            color: #3a4167;
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
          color: blue;

        }
        /deep/.ant-table{
        
        }
        .opetate{
          display: flex;
          justify-content: space-around;
        }
         /deep/.ant-table-tbody > tr > td:nth-child(6):hover{
           cursor: pointer;
         }
       
        
    }
}

</style>